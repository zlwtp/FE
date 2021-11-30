module.exports = (config, option) => {
    const { minimize, splitChunks } = option

    const optimization = {
        minimize
    }

    config.optimization = {
        splitChunks: false, // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
        runtimeChunk: false,
        ...config.optimization,
        ...optimization
    }
    if (process.env.NODE_ENV === 'production') {
        config.optimization.splitChunks = {
            chunks: 'async',
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            hidePathInfo: true,
            cacheGroups: {
                select2: {
                    test: /select2/,
                    chunks: 'async',
                    name: 'select2',
                    priority: 10
                },
                wangEditor: {
                    test: /wangEditor/,
                    chunks: 'async',
                    name: 'wangEditor',
                    priority: 10
                },
                pdf: {
                    test: /pdf/,
                    chunks: 'async',
                    name: 'pdf',
                    priority: 10
                },
                echarts: {
                    test: /echart/,
                    chunks: 'async',
                    name: 'echarts',
                    priority: 10
                },
                jquery: {
                    test: /jquery/,
                    chunks: 'async',
                    name: 'jquery',
                    priority: 10
                },
                moment: {
                    test: /moment/,
                    chunks: 'async',
                    name: 'moment',
                    priority: 10
                },
                lodash: {
                    test: /lodash/,
                    chunks: 'async',
                    name: 'lodash',
                    priority: 10
                },
                html2canvas: {
                    test: /html2canvas/,
                    chunks: 'async',
                    name: 'html2canvas',
                    priority: 10
                },
                'com-echarts2': {
                    test: /com-echarts2/,
                    chunks: 'async',
                    name: 'com-echarts2',
                    priority: 10
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    minChunks: 2,
                    priority: -10
                },
                default: {
                    chunks: 'async',
                    minChunks: 2,
                    maxSize: 1000000,
                    name: 'common',
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}
