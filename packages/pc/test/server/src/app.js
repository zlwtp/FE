const createApp = require('@2haohr/end-create-app')
const frontRouter = require('./frontRouter') // 前端路由处理中间件

// 创建app实例
const app = createApp()

if (process.env.NODE_ENV === 'production') {
    // 线上服务，只输出前端页面，node服务额外脚本部署

    // 加载中间件
    Array.from([].concat(frontRouter)).forEach(m => app.use(m))

    // 开始监听
    app.listen(2333, () => {
        console.log(`success! server running http://localhost:2333`)
    })
} else {
    // 本地服务，需要额外加载本地node服务、cdn资源服务

    const proxy = require('@2haohr/end-proxy')
    const { localCdnService } = require('@2haohr/end-static')
    const { contentBase } = require('../.dm/pkg.config.json')
    const endMiddleware = require('@2haohr/end-middleware')
    const endRouter = require('./endRouter')

    // 加载中间件
    Array.from(
        [].concat(
            proxy('/api', {
                target: 'https://dev.2haohr.com',
                changeOrigin: true
            }),
            // proxy('/yapi', {
            //     target: 'http://yapi.2haohr.com:4000/mock',
            //     changeOrigin: true,
            //     rewrite: path => path.replace(/^\/yapi/, '')
            // }),
            // proxy('/nodeapi/print', {
            //     target: 'http://localhost:17200',
            //     changeOrigin: true,
            //     rewrite: path => path.replace(/^\/nodeapi\/print/, '/api')
            // }),
            // proxy('/nodeapi/flexible-staffing/print', {
            //     target: 'http://localhost:17200',
            //     changeOrigin: true,
            //     rewrite: path => path.replace(/^\/nodeapi\/flexible-staffing\/print/, '/api')
            // }),
            // proxy('/pdf-viewer', {
            //     target: 'https://dev.2haohr.com',
            //     changeOrigin: true
            // }),
            endMiddleware, // 后端层中间件（$Api 等常用的实例注入）
            endRouter, // 后端路由处理中间件
            localCdnService(contentBase),
            frontRouter // 前端路由处理中间件
        )
    ).forEach(m => app.use(m))

    // 监听端口、启动socket用于编译页面自动刷新
    const socket = require('@2haohr/end-livereload')
    const server = socket(app)
    const pkg = require('../package.json')
    const port = pkg.dm.index + 10000
    server.listen(port, () => {
        console.log(
            `服务正在运行，地址 [ http://${require('@2haohr/end-ip-address')()}:${port} ] [ http://localhost:${port} ] [ http://0.0.0.0:${port} ]`
        )
    })
}
