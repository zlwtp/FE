const Errors = require('@2haohr/end-errors')

module.exports = function(cb) {
    return async function(ctx, next) {
        ctx.Errors = Errors
        try {
            await next()
        } catch (e) {
            if (e instanceof Errors.HttpError) { // 意料之中的错误
                ctx.status = e.status
                const extra = e.extra || {}
                ctx.body = {
                    error: e.message,
                    resultcode: extra.resultcode,
                    data: extra.data,
                    uri: extra.uri
                }
            } else { // 意料之外的错误
                ctx.status = e.status || 500
                ctx.body = {
                    error: e.message
                }
                cb(e)
            }
        }
    }
}
