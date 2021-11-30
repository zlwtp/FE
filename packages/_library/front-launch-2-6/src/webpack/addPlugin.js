
module.exports = (config, option) => {
    const { resolve } = require('path')

    const DllReferencePlugin = require('./plugin/linkDllReference')
    const { DllPlugin, ProvidePlugin, DefinePlugin, ContextReplacementPlugin, HotModuleReplacementPlugin } = require('webpack')
    const Clean = require('clean-webpack-plugin')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')
    const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

    const { clean, dist, template, provide, environment, dll, dllReference, root, analysisSize, analysisSizeToJson, cssExtract, mode, devServer } = option

    const transformEnvironment = env => {
        const rs = {}
        Object.keys(env).forEach(key => {
            rs[`process.env.${key}`] = env[key]
        })
        return rs
    }

    const plugins = Array.from([].concat(
        new VueLoaderPlugin(), // Vue-loader插件
        clean ? new Clean([dist], { root }) : [], // 清空
        provide ? new ProvidePlugin(provide) : [], // 全局模块
        environment ? new DefinePlugin(transformEnvironment(environment)) : [], // 全局变量
        dll ? new DllPlugin({ // Dll plugin
            context: '.',
            name: 'dll',
            path: resolve(root, `dist/[name].json`),
            ...dll
        }) : [],
        dllReference ? new DllReferencePlugin({ // DllReference plugin
            context: '.',
            ...dllReference
        }) : []
    ))
    if (cssExtract) {
        plugins.push(
            // 提取CSS
            new MiniCssExtractPlugin({
                filename: '[name].[hash:9].css',
                chunkFilename: '[name].[chunkhash:9].css',
                ignoreOrder: true // 忽略顺序警告
            }),
            // CSS压缩
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } }
                    ]
                },
                canPrint: true
            })
        )
    }

    // Html模版
    if (template) {
        const rs = typeof template
        if (Array.isArray(template)) {
            template.forEach(item => {
                plugins.push(new HtmlWebpackPlugin(item))
            })
        } else if (rs === 'string') {
            plugins.push(new HtmlWebpackPlugin({
                chunks: ['index'],
                template,
                filename: 'index.html'
            }))
        } else if (rs === 'object') {
            plugins.push(new HtmlWebpackPlugin(template))
        }
    }

    // 除去moment非中文语言包
    plugins.push(new ContextReplacementPlugin(
        /moment[\\\/]locale$/,
        /^\.\/(zh-cn)$/
    ))

    if (analysisSize) {
        // 本地分析包体积模式
        plugins.push(new BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: true,
            analyzerMode: 'server'
        }))
    }
    if (analysisSizeToJson) {
        // 输出分析包体积文件模式
        plugins.push(new BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: false,
            analyzerMode: 'json'
        }))
    }

    // hmr
    if (mode === 'development' && devServer.hot) {
        const hmr = new HotModuleReplacementPlugin()
        plugins.push(hmr)
    }
    /*
     * TODO: assetsPath
     * TODO: sourceMap
     */

    config.plugins = plugins
}
