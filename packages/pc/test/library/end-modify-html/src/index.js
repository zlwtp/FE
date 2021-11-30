const { transformHTML } = require('@2haohr/end-static')
const { readFileSync } = require('fs')

const noFront = ['login-feishu', 'login-wework']

const getHtmlTransform = namespace => {
    if (noFront.includes(namespace)) {
        return []
    }
    // 基础架构v1.0
    let version = ''
    if (process.env.NODE_ENV === 'production') {
        // 线上环境
        version = require('@2haohr-major/front-app/dist/version.js')
    }
    const url = `<script type="text/javascript" src="/stc/2haohr-major/front-app/index${version}.js"></script>`
    return [
        {
            template: '<!-- front-app-insert -->',
            value: url
        }
    ]
}

// 线上环境html缓存
module.exports = (file_path, opt) => {
    const temp = readFileSync(file_path).toString('utf-8')
    const htmlTransform = getHtmlTransform(opt.namespace)
    const html = htmlTransform.reduce((prev, next) => {
        const { template, value } = next
        return prev.replace(template, value)
    }, temp)
    return transformHTML(html, opt)
}
