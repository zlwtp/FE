const addMode = require('./addMode')
const addEntry = require('./addEntry')
const addOutput = require('./addOutput')
const addExternals = require('./addExternals')
const addResolve = require('./addResolve')
const addModule = require('./addModule')
const addResolveLoader = require('./addResolveLoader')
const addPlugin = require('./addPlugin')
const addOptimization = require('./addOptimization')
const addDevServer = require('./addDevServer')

const getWebpackTemplateConfig = () => ({
    mode: '',
    entry: {},
    output: {},
    externals: {},
    resolve: {},
    module: {
        rules: []
    },
    resolveLoader: {
        modules: []
    },
    plugins: [],
    optimization: {},
    performance: {
        hints: false
    }
})

const parser = (option = {}) => {
    if (Array.isArray(option)) {
        return option.map(item => parser(item))
    }

    const webpackTemplateConfig = getWebpackTemplateConfig() // 防止数据污染，每次都返回一个新的

    addMode(webpackTemplateConfig, option)
    addDevServer(webpackTemplateConfig, option)
    addEntry(webpackTemplateConfig, option)
    addOutput(webpackTemplateConfig, option)
    addExternals(webpackTemplateConfig, option)
    addResolve(webpackTemplateConfig, option)
    addModule(webpackTemplateConfig, option)
    addResolveLoader(webpackTemplateConfig, option)
    addPlugin(webpackTemplateConfig, option)
    addOptimization(webpackTemplateConfig, option)

    return webpackTemplateConfig
}

module.exports = parser
