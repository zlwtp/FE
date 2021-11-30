import statistics from '@2haohr/front-behavior-statistics'

const validateRight = to => {
    const { permission } = to.meta
    switch (Object.prototype.toString.call(permission)) {
        case '[object Boolean]':
            return permission
        case '[object String]':
            return Vue.$ctx.store.getters['user/permission'][permission]
        case '[object Array]':
            for (const i of permission) {
                if (!Vue.$ctx.store.getters['user/permission'][i]) {
                    return false
                }
            }
            break
        case '[object Function]':
            return permission()
        default:
            break
    }
    return true
}

/**
 * 初始化用户配置
 */
export const UserConfig = async ({ Vue }) => {
    const { store } = Vue.$ctx
    await store.dispatch('user/config/init')
}

/**
 * 初始化用户信息
 */
export const UserInfo = async ({ Vue }) => {
    const { store, trail, router, env } = Vue.$ctx

    await Promise.all([
        store.dispatch('user/permission/init'), // 更新企业信息
        store.dispatch('corp/info/init'), // 更新企业信息
        store.dispatch('user/info/init') // 更新用户信息
    ])
    store.dispatch('ec/init') // 获取页面元素控制
    const platform =
        {
            wework: 1,
            feishu: 2
        }[Vue.$ctx.platform] || ''
    // 初始化行为统计
    Vue.$ctx.dma = statistics({
        token_id: Vue.$ctx.accesstoken,
        platform,
        ct: 1,
        env
    })

    const corpInfo = store.state.corp.info
    if ((!corpInfo.company_no || !corpInfo.fullname) && !trail) {
        location.href = '/login/no-permission'
        throw new Error('请先激活账号') // 抛出异常打断后续代码执行
    }
    router.beforeEach(async (to, from, next) => {
        for (const i of to.matched) {
            if (!validateRight(i)) {
                console.error('无权限访问')
                location.href = '/permission/denied'
                return
            }
        }
        next()
    })
}

/**
 * 初始化用户后置异步处理钩子
 */
export const UserAfter = async ({ Vue }) => {
    const {
        util: { localStorage },
        store,
        auth,
        env,
        kf5,
        log
    } = Vue.$ctx

    // 异步处理
    setTimeout(() => {
        // 企业活跃度统计
        log.UV()
        // 用户退出事件窗口监听
        localStorage.addEvent('business_logout', async () => {
            auth.clearToken()
            location.href = '/'
        })
        // 切换企业事件窗口监听
        localStorage.addEvent(`${env}_2HAOHR_CACHE_company_no`, val => {
            location.replace('/desk') // 刷新页面
        })
        // 已登录状态下写入kf5用户标识
        kf5.identify({
            name: store.state.user.info.nickname,
            // 自定义用户信息
            metadata: [
                {
                    name: 'account',
                    value: store.state.user.info.account
                },
                {
                    name: 'company_no',
                    value: store.state.corp.info.company_no
                },
                {
                    name: 'url',
                    value: location.href
                }
            ]
        })
        // 休眠激活时更新权限
        Vue.$ctx.activate.wakeup(() => {
            store.dispatch('user/permission/init')
            log.UV()
        })
    }, 0)
}
