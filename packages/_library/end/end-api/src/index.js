const axios = require('axios')
const http = require('http')
const https = require('https')
const tunnel = require('tunnel')
const {URL} = require('url')
const pythonApiUrl = require('@2haohr-major/end-python-api-url')
const Errors = require('@2haohr/end-errors')
const {environment} = require('@2haohr/end-env')

module.exports = async(ctx, next) => {
    const httpsAgent = new https.Agent({
        keepAlive: true
    })
    const httpAgent = new http.Agent({
        keepAlive: true
    })

    const instance = axios.create({
        baseURL: pythonApiUrl,
        httpAgent,
        httpsAgent
    })

    instance.interceptors.response.use(function(response) {
        const end_dt = +new Date()
        const run_time = end_dt - response.config.start_dt
        const url = new URL(response.config.url.substring(0, response.config.url.length - 1))
        ctx.set(`python${url.pathname.replace(/[^A-Za-z0-9\-]/g, '-')}`, run_time)
        const data = response.data
        switch (data.resultcode) {
            case 200:
                return data.data
            case 401:
                throw new Errors.Unauthorized({
                    message: data.errormsg,
                    extra: {
                        ...data,
                        uri: response.config.baseURL + response.request.path
                    }
                })
            case 403:
                throw new Errors.Forbidden({
                    message: data.errormsg,
                    extra: {
                        ...data,
                        uri: response.config.baseURL + response.request.path
                    }
                })
            default:
                throw new Errors.BadRequest({
                    message: data.errormsg || '参数错误',
                    extra: {
                        ...data,
                        uri: response.config.baseURL + response.request.path
                    }
                })
        }
    }, e => Promise.reject(e))

    instance.interceptors.request.use(function(config) {
        config.start_dt = +new Date()
        if (typeof config.proxy === 'boolean') { // 这个配置用于把请求转发到charles/fiddler
            if (environment === 'dev-server') { // dev-server有效
                config.httpAgent = tunnel.httpOverHttp({
                    proxy: {
                        host: '127.0.0.1',
                        port: 8888
                    },
                    keepAlive: true
                })
                config.httpsAgent = tunnel.httpsOverHttp({
                    proxy: {
                        host: '127.0.0.1',
                        port: 8888
                    },
                    rejectUnauthorized: false,
                    keepAlive: true
                })
            }
            delete config.proxy
        }
        config.headers = Object.assign(
            {
                ...ctx.request.headers,
                host: new URL(pythonApiUrl).host
            },
            config.headers
        )
        return config
    }, e => Promise.reject(e))

    ctx.$api = instance

    await next()
}
