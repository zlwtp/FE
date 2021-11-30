import { trail, env, platform } from '../env'

export default async ({ Vue }) => {
    const {
        util: { sessionStorage, cookie, localStorage, qs },
        api,
        website_url
    } = Vue.$ctx

    class Auth {
        constructor() {
            this.tokenName = `accesstoken${platform}-${env}`
        }

        async initToken() {
            // 获取token
            let { token, account } = this.getToken()
            const { code, auth_code, state } = qs.parse(location.search.substr(1))
            const _code = code || auth_code
            let stateObj = {}

            // 小程序安装完需要回调到对应域名
            if (
                !platform &&
                _code &&
                state &&
                state.indexOf('"value":') > -1 &&
                state.indexOf('"from":') > -1 &&
                Vue.$ctx.envVal > 0
            ) {
                stateObj = JSON.parse(state)
                if (stateObj.from) {
                    location.replace(
                        location.href.replace(
                            /https:\/\//,
                            `https://${stateObj.from}${Vue.$ctx.envVal === 10000 ? '.' : '-'}`
                        )
                    )
                    return
                }
            }

            if (
                _code &&
                (Number(state) === 2010 || state === 'wework_login' || !state) &&
                [22, 43, 107, 128].includes(_code.length) &&
                ['feishu', 'wework'].includes(platform)
            ) {
                try {
                    if (platform === 'wework' && auth_code && Number(state) === 2010) {
                        // const data = await api.post(
                        //     '/api/account/v3/qyweixin/confirm_auth/',
                        //     {
                        //         app_id: state,
                        //         auth_code: _code
                        //     }
                        // )
                        // const info = await api.post(
                        //     '/api/ucenter/v2/app_open/qywechat/',
                        //     {
                        //         auth_corpid: data.corp_info.corpid,
                        //         permanent_code: data.auth_info.permanent_code,
                        //         agent_id: data.auth_info.agentid,
                        //         corp_info: {
                        //             corp_name: data.corp_info.corp_name,
                        //             corp_user_max: data.corp_info.corp_user_max,
                        //             corp_full_name:
                        //                 data.corp_info.corp_full_name,
                        //             location: data.corp_info.location
                        //         },
                        //         auth_user_info: {
                        //             userid: data.auth_user_info.userid,
                        //             name: data.auth_user_info.name,
                        //             avatar: data.auth_user_info.avatar
                        //         }
                        //     }
                        // )
                        const data = await api.post('/api/ucenter/v2/wework_app_open/from_wework/', {
                            auth_code: _code
                        })
                        if (!token) {
                            token = data.accesstoken
                            this.setToken({ token })
                            // account = info.account
                            // this.setToken({ token, account })
                        }
                    } else {
                        const parmas = { code: _code }
                        if (platform === 'wework' && state === 'wework_login' && _code.length === 43) {
                            parmas.type = 'webPage'
                        }
                        // 调用后端接口获取token
                        const data = await api.post('/api/account/v4/users/wework_login/', parmas)
                        token = data.accesstoken
                        account = data.account
                        this.setToken({ token, account })
                    }
                    const querys = qs.parse(location.search.substr(1))
                    delete querys.auth_code
                    delete querys.code
                    location.replace(
                        `${location.pathname}?${Object.keys(querys)
                            .map(key => `${key}=${querys[key]}`)
                            .join('&')}`
                    )
                } catch (e) {
                    document.querySelector('#app').style.display = 'none'
                    Vue.$message.error(e.errormsg)
                    await new Promise(resolve => {
                        setTimeout(() => {
                            location.href = Vue.$ctx[platform].login_url
                        }, 3000)
                    })
                    throw new Error(`获取${platform === 'feishu' ? '飞书' : '企业微信'}授权失败`) // 抛出异常可以打断后续的代码执行
                }
            } else if (!token) {
                if (['feishu', 'wework'].includes(platform)) {
                    location.replace(Vue.$ctx[platform].login_url)
                    throw new Error(`缺少accesstoken，获取${platform === 'feishu' ? '飞书' : '企业微信'}授权`) // 抛出异常可以打断后续的代码执行
                } else {
                    location.href = '/login'
                    throw new Error('缺少accesstoken，请重新登录') // 抛出异常可以打断后续的代码执行
                }
            }
            api.option.headers.accesstoken = token
            Vue.$ctx.accesstoken = token
            this.token = token
            this.account = account
            console.log('token', token, this.token)
        }

        // 获取token
        getToken() {
            if (trail) {
                return {
                    token: '00000000000000000000000000000000',
                    account: ''
                }
            }

            const json = cookie.get(this.tokenName) // 获取token字符串
            if (!json) {
                return ''
            }

            const tokenObj = JSON.parse(json) // 解析token为对象

            return {
                token: tokenObj.token,
                account: tokenObj.account || ''
            }
        }

        // 设置token
        setToken({ token, account = '' }) {
            // 设置token到cookie中
            cookie.set(
                this.tokenName,
                JSON.stringify({
                    token,
                    account
                }),
                {
                    expDay: 29
                }
            )
        }

        // 清空token
        clearToken() {
            if (trail) return
            cookie.remove(this.tokenName)
            sessionStorage.remove(this.tokenName)
        }

        // 退出登录
        async signout() {
            // cookie中保留的凭证是否是否为当前账号
            const isCurrentAccount = () => {
                const { account } = this.getToken()
                return account === this.account
            }

            if (isCurrentAccount()) {
                try {
                    // 触发其他窗口
                    localStorage.handle('business_logout')
                    // 关闭socket连接
                    if (Vue.$ctx.websocket) {
                        await Vue.$ctx.websocket.stop()
                    }
                    // 调用退出登录接口
                    await api.get('/api/account/v4/users/logout/')
                } catch (e) {
                    console.log(e)
                }
            }

            if (['feishu', 'wework'].includes(Vue.$ctx.platform)) {
                this.clearToken()
                location.replace(Vue.$ctx[Vue.$ctx.platform].login_url)
                return
            }

            // if (isCurrentAccount()) {
            //     // 再次强校验，防止接口调用期间凭证发生变化，把凭证刷没了
            //     this.clearToken();
            //     location.replace(
            //         `https://passport.hrloo.com/user/logout?referer=${encodeURIComponent(
            //             website_url
            //         )}`
            //     );
            // } else if (!trail) {
            //     // 非体验账号
            // }
            this.clearToken()
            location.href = website_url
        }
    }

    Vue.$ctx.auth = new Auth()

    await Vue.$ctx.auth.initToken()
}
