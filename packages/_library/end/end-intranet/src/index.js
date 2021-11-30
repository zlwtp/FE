const {environment} = require('@2haohr/end-env')

module.exports = async function(ctx, next) {
    if (ctx.path.startsWith('/intranet/')) {
        const intranetUrl = {
            'dev-server': 'intranet-dev.2haohr.com',
            dev: 'intranet-dev.2haohr.com',
            test: 'intranet-test.2haohr.com',
            pd: 'intranet.2haohr.com'
        }[environment]
        if (ctx.request.headers.host !== intranetUrl) {
            throw new ctx.Errors.NotFound()
        }
    }
    await next()
}
