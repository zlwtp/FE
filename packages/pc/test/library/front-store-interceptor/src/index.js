/**
 * 基础接口调用时的错误处理
 */
const genErrorCode = apiPath =>
    ({
        '/api/ucenter/v2/permission/my/': '90001',
        '/api/ucenter/companys/company_info/': '90002',
        '/api/account/v4/users/user_info/': '90003'
    }[apiPath])

const genIntercepor = () => {
    const originMap = {
        'dev-server': 'http://localhost:13101',
        dev: `https://dev.2haohr.com`,
        test: `https://test.2haohr.com`,
        pd: `https://2haohr.com`
    }
    const { location } = window
    return {
        responseSuccess({ config, data }) {
            const origin = originMap[Vue.$ctx.env]
            if (!data) {
                return Promise.reject(data)
            }
            if (config.url.startsWith('/api')) {
                switch (data.resultcode) {
                    case 200:
                        return Promise.resolve(data.data)
                    // 未登录或者token失效
                    case 401:
                    case 403:
                        Vue.$ctx.auth.clearToken()
                        if (['feishu', 'wework'].includes(Vue.$ctx.platform)) {
                            location.replace(Vue.$ctx[Vue.$ctx.platform].login_url)
                        } else {
                            location.replace(`${origin}/login`)
                        }
                        break
                    default:
                        location.replace(`${origin}/error`)
                        break
                }
                return Promise.reject(data)
            }
            return Promise.resolve(data)
        },
        responseError({ config, response }) {
            const origin = originMap[Vue.$ctx.env]
            const errData = {
                path: config.url,
                errormsg: response.statusText,
                code: response.status
            }
            const errorCode = genErrorCode(config.url) || ''
            if (typeof response.data === 'object') {
                errData.errormsg = response.data.error
                errData.code = response.data.resultcode
                errData.data = response.data.data
            }
            switch (response.status) {
                // 未登录或者token失效
                case 401:
                case 403:
                    Vue.$ctx.auth.clearToken()
                    if (['feishu', 'wework'].includes(Vue.$ctx.platform)) {
                        location.replace(Vue.$ctx[Vue.$ctx.platform].login_url)
                    } else {
                        location.href = `${origin}/login`
                    }
                    break
                default:
                    location.href = `${origin}/error?errorCode=${errorCode}`
                    break
            }
            return Promise.reject(errData)
        }
    }
}

export default genIntercepor
