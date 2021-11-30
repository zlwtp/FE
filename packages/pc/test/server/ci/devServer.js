// nodemon启动本地服务并监听变化
const pkgs = require('../.dm/pkg.config.json')
const nodemon = require('@2haohr/nodemon')
const pkg = require('../package.json')
const port = pkg.dm.index + 10000

nodemon({
    watch: pkgs.contentBase
        .filter(item => item.includes(`major/server`) ||
                item.includes('_library/end') ||
                item.includes('major/end') ||
                // 兼容windows系统
                item.includes(`major\\server`) ||
                item.includes('_library\\end') ||
                item.includes('major\\end'))
        .map(item => item.replace(/node_modules$/, 'src/')),
    events: {
        async start() {
            const { resolve } = require('path')

            // 启动前端层编译并监听变化
            Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
                .filter(key => key.startsWith('@2haohr-major-front/') || key.startsWith('@2haohr-major/front'))
                .forEach(pkgName => {
                    const watch = require(`${pkgName}/ci/watch`)
                    const root = resolve(`node_modules/${pkgName}`)
                    watch({ root, port })
                })
        }
    },
    port
})
