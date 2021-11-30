const qs = require('./middleware/qs')
const logger = require('@2haohr/end-logger')
const errorHandle = require('@2haohr/end-error-handle')
const intranet = require('@2haohr/end-intranet')
const koaBody = require('koa-bodyparser')
const api = require('@2haohr/end-api')
const {environment} = require('@2haohr/end-env')

module.exports = [
    logger,
    errorHandle(e => {
        if (environment === 'pd') { // 线上环境传到sentry
            // TODO: 上传sentry
        } else {
            console.error(e)
        }
    }),
    qs,
    koaBody(),
    intranet,
    api
]
