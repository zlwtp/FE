
const Koa = require('koa')

module.exports = (namespace) => {
    const app = new Koa()
    app.use(async(ctx, next) => {
        ctx.$namespace = namespace
        await next()
    })
    return app
}
