const getHtml = require('@2haohr-major/end-modify-html')
const createRouter = require('@2haohr/end-create-router')

const { basename, resolve } = require('path')
const pkg = require('../package.json')

const router = createRouter()

// 线上环境html缓存
const cacheHTML = {}

Object.keys(pkg.dependencies)
    .filter(name => name.startsWith('@2haohr-major-front/'))
    .forEach(pkgName => {
        const namespace = basename(pkgName)
        // 前端路由处理
        const file_path = resolve(`node_modules/${pkgName}/dist/index.html`)
        router.get([`/${namespace}`, `/${namespace}/*`], async ctx => {
            const opt = { namespace, platform: '' }
            // 集团版要以enterprise开头
            if (namespace.startsWith('enterprise-')) {
                opt.edition = 'enterprise'
            }
            // if (checkFresh(ctx, file_path)) return

            if (process.env.NODE_ENV === 'production') {
                // 线上环境html走缓存
                cacheHTML[namespace] = cacheHTML[namespace] || getHtml(file_path, opt)
                ctx.body = cacheHTML[namespace]
            } else {
                ctx.body = getHtml(file_path, opt)
            }
        })
    })

router.redirect('/', '/test')

module.exports = [router.routes(), router.allowedMethods()]
