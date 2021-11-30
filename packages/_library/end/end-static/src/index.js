
const getAssetDomain = () => {
    let affix = `-${process.env.DM_PROJECT_ENV}`
    if (process.env.DM_PROJECT_ENV === 'pd') {
        affix = ''
    }
    return `https://stc${affix}.2haohr.com`
}

/**
 * 检查请求对应文件缓存是否新鲜
 */
const { statSync } = require('fs')
const checkFresh = (ctx, file) => {
    ctx.status = 200

    ctx.lastModified = statSync(file).atime.toUTCString()
    if (ctx.fresh) {
        ctx.status = 304
        return true
    }
    return false
}

/**
 * 插入全局变量 && 转换html中的cdn地址
 */
const replaceRegExp = `^\\/stc\\/(\\S+?)\\/(\\S+?)\\/(.*)`
const replaceStr = process.env.NODE_ENV === 'development' ? `/stc/@$1/$2/dist/$3` : `${getAssetDomain()}/$1/$2/$3`
const transformHTML = (content, option) => {
    // 替换页面中的cdn地址
    content = content.replace(/(src|href)=\".*?\"/gi, str => {
        const arr = str.split(/\"/)
        return `${arr[0]}"${arr[1].replace(new RegExp(replaceRegExp), replaceStr)}"${arr[2]}`
    })
    const opt = {
        ...option,
        env: process.env.DM_PROJECT_ENV,
        affix: process.env.DM_PROJECT_ENV === 'pd' ? '' : `-${process.env.DM_PROJECT_ENV}`
    }
    // 插入异步cdn地址解析方法
    const getPublicPath = `function(url){ return url.replace(/${replaceRegExp}/, '${replaceStr}') }`
    content = content.replace(/<\/head>/, `  <script>${
        Object.keys(opt)
            .map(item => `window['${item}'] = '${opt[item]}';`)
            .join('')
    }window.getPublicPath = ${getPublicPath}</script>\n</head>`)

    return content
}

/**
 * 本地cdn资源服务
 */
const { join } = require('path')
const { existsSync, createReadStream } = require('fs')
const localCdnService = contentBase => async function(ctx, next) {
    // stc 静态资源路由处理
    if (ctx.path.startsWith(`/stc`)) {
        for (const dir of contentBase) {
            const file_path = join(dir, ctx.path.replace(/^\/stc/, ''))
            if (existsSync(file_path)) {
                // if (checkFresh(ctx, file_path)) return
                if ((/\.css$/).test(file_path)) {
                    ctx.type = 'text/css'
                }
                ctx.body = createReadStream(file_path)
                break
            }
        }
    } else {
        await next()
    }
}

module.exports = {
    transformHTML,
    checkFresh,
    localCdnService
}
