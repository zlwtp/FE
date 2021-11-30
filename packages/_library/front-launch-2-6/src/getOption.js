const defaultOption = {
    mode: process.env.NODE_ENV || 'production',
    root: process.cwd(),
    entry: './src/index.js', // 打包入口
    dist: process.env.DM_DIST_DIR, // 输出目录
    template: false, // Html模板
    publicPath: '', // 同output.publicPath，公共路径
    // AssetsPath: process.env.NODE_ENV === 'production' ? '' : 'static/', // 相对于dist的子目录，图片、字体文件的存放路径
    urlLoaderLimit: 10000, // 图片、字体等资源文件小于多少时（单位 Byte）内嵌在 JS 或 CSS 中
    clean: process.env.NODE_ENV === 'production', // 是否清空之前的输出目录
    hash: false, // 输出文件名是否带 7 位的长度 hash 值
    chunkhash: process.env.NODE_ENV === 'production', // 输出文件名是否带 7 位的长度 hash 值
    // SourceMap: false, // 构建后的文件带 sourceMap
    minimize: process.env.NODE_ENV === 'production', // 是否启动压缩
    library: '', // 同output.library
    libraryTarget: 'umd', // 同output.libraryTarget
    externals: {}, // 不需要打包的模块
    environment: {}, // 全局变量
    provide: {
        // 全局模块
        Vue: 'vue'
    },
    alias: {
        // 同resolve.alias
        vue: 'vue/dist/vue.common.js'
    },
    dll: false,
    dllReference: false,
    analysisSize: process.env.DM_RUN_MODE === 'analysis-size',
    analysisSizeToJson: process.env.DM_RUN_MODE === 'analysis-size-to-json',
    cssExtract: false, // 是否样式提取，外联样式
    // splitChunks: false, // 是否代码拆分
    pluginComponent: false, // 组件是否按需引入
    color2var: false, // 是否使用css variable主题色方案
    // imageCompress: process.env.NODE_ENV === 'production' // 是否开启图片压缩
    // imageCompress: false, // 是否开启图片压缩
    sassMixin: '' // sass函数
}

// 获取静态资源域名
const getAssetDomain = () => {
    const env = process.env.DM_PROJECT_ENV
    switch (env) {
        case 'dev':
            return `https://stc-dev.2haohr.com`
        case 'test':
            return `https://stc-test.2haohr.com`
        case 'pd':
            return `https://stc.2haohr.com`
        default:
            return ''
    }
}

const getOption = option => {
    if (Array.isArray(option)) {
        return option.map(item => getOption(item))
    }

    const rs = {
        ...defaultOption,
        ...option
    }

    // 浅拷贝只到一层对象属性，二层对象属性需要再次拷贝
    rs.alias = { ...defaultOption.alias, ...option.alias }
    rs.externals = { ...defaultOption.externals, ...option.externals }
    rs.extension = { ...defaultOption.extension, ...option.extension }
    rs.provide = { ...defaultOption.provide, ...option.provide }
    rs.environment = { ...defaultOption.environment, ...option.environment }
    rs.loader = { ...defaultOption.loader, ...option.loader }

    const { resolve } = require('path')
    const { readFileSync } = require('fs')
    const { name } = JSON.parse(readFileSync(`${rs.root}/package.json`))
    const switchFile = resolve(rs.root, './.dm/runtime.config.json')

    rs.library = name.replace(/\//g, '--')
    rs.publicPath = rs.publicPath || `/${process.env.DM_ASSET_PATH}/${name.replace('@', '')}/`
    // TODO: 后续将静态资源publicPath运行时拼接改为编译时拼接
    const assetDomain = getAssetDomain()
    if (assetDomain) {
        rs.publicStaticPath = `${assetDomain}/${name.replace('@', '')}/`
    } else {
        rs.publicStaticPath = `/${process.env.DM_ASSET_PATH}/${name}/dist/`
    }

    if (rs.watch) {
        if (!rs.watch.port) {
            console.log('编译监听缺少端口号 watch(option,{ port })')
            process.exit(1)
        }
        rs.watch = {
            ...rs.watch,
            name,
            switchFile
        }
    }

    // 添加 hmr 默认配置
    if (rs.mode === 'development') {
        rs.devServer = {
            hot: true,
            ...(option.devServer || {})
        }
    }

    return rs
}

module.exports = getOption
