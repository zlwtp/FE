
module.exports = option => [
    {
        resourceQuery: /blockType=icon/,
        loader: require.resolve('./icon-block.js')
    },
    {
        test: /\.icon$/,
        use: {
            loader: 'svg-sprite-loader',
            options: {
                runtimeGenerator: require.resolve('./svg-custom-runtime-generator'),
                symbolId: 'icon-[hash:5]',
                symbolRegExp: /([^<>/\\\|:""\*\?]+)\.icon$/
            }
        }
    }
]
