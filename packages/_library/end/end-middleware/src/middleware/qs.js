const qs = require('qs')
const merge = require('merge-descriptors')

/*
https://github.com/koajs/qs/blob/bf1225edd5627cea98e19699c5c8f5417269b534/index.js#L26
 */
module.exports = async function(ctx, next) {
    merge(ctx.request, {
        get query() {
            const str = this.querystring
            if (!str) return {}
            const c = this._querycache = this._querycache || {}
            let query = c[str]
            if (!query) {
                c[str] = query = qs.parse(str)
            }
            return query
        },
        set query(obj) {
            this.querystring = qs.stringify(obj)
        }
    })
    // 此处解决 ctx.request.query 没有原型 导致 async-validate 使用 hasOwnProperty 报错
    Object.setPrototypeOf(ctx.request.query, {})
    await next()
}
