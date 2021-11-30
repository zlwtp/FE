export const redirect = (data, comPlatform) => {
    const { location } = window
    const { trail } = Vue.$ctx

    // 判断企业注册来源，使用正确的域名问题，wework跟saas版功能不同
    if (comPlatform === 'wework' && window.env !== 'dev-server' && !location.host.startsWith('wework')) {
        location.replace(location.href.replace(location.origin, `https://wework${window.affix}.2haohr.com`))
        return
    }
    if ((!data.company_no || !data.fullname) && !trail && location.pathname !== '/complete-info') {
        // 需要完善信息,其他平台就跳转到saas中间页
        location.href = ['feishu', 'wework'].includes(window.platform)
            ? `${window.env === 'pd' ? '' : `${window.env}.`}2haohr.com`
            : '/login/no-permission'
        throw new Error('请先激活账号') // 抛出异常打断后续代码执行
    }
}
