
const pkg = require('../package.json')

// 路由处理
const { basename } = require('path')
const createRouter = require('@2haohr/end-create-router')
const router = createRouter()
Object
    .keys(pkg.dependencies)
    .filter(name => name.startsWith('@2haohr-major-end/'))
    .forEach(pkgName => {
        const name = basename(pkgName)
        router.use(`/napi/${name}`, require(`${pkgName}/src/router`).routes())
    })

module.exports = [
    router.routes(),
    router.allowedMethods()
]
