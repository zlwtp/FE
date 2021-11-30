const logger = require('./logger')
const {environment} = require('@2haohr/end-env')

module.exports = async function(ctx, next) {
    logger.register(ctx.$namespace)
    ctx.logger = logger
    const start_dt = +new Date()
    await next()
    const end_dt = +new Date()
    // 线上环境 记Api log
    if (environment === 'pd') {
        // 只记json
        const body = ctx.response.header['content-type'] === 'application/json' ? ctx.response.body : ''
        logger.info('API日志', {
            url: ctx.url,
            request: {
                href: ctx.href,
                query: ctx.request.query,
                body: ctx.request.body,
                header: {
                    'user-agent': ctx.request.header['user-agent']
                },
                ip: ctx.request.ip
            },
            response: {
                body,
                header: ctx.response.header,
                message: ctx.response.message
            },
            status: ctx.response.status,
            run_time: end_dt - start_dt
        })
    }
}
