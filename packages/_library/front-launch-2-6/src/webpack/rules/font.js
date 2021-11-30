
module.exports = option => {
    const { urlLoaderLimit } = option

    return Array.from([
        'woff',
        'eot',
        'ttf',
        'swf'
    ]).map(key => ({
        test: new RegExp(`\\.${key}$`),
        use: {
            loader: 'url-loader',
            options: {
                limit: urlLoaderLimit,
                name: '[sha512:hash:base64:8].[ext]'
            }
        }
    }))
}
