
module.exports = option => {
    const {
        urlLoaderLimit
    } = option
    const loaders = []
    const urlLoader = {
        loader: 'url-loader',
        options: {
            limit: urlLoaderLimit,
            name: '[sha512:hash:base64:8].[ext]'
        }
    }
    const compressLoader = {
        loader: 'image-webpack-loader',
        options: {
            disable: process.env.NODE_ENV !== 'production',
            name: '[sha512:hash:base64:8].[ext]',
            mozjpeg: {
                progressive: true,
                quality: 65
            },
            optipng: {
                enabled: false // 禁用optipng
            },
            pngquant: {
                quality: [
                    0.65,
                    0.9
                ],
                speed: 4
            },
            gifsicle: {
                interlaced: false
            }
            // webp: { // webp选项将启用webp
            //     quality: 75
            // }
        }
    }
    loaders.push(urlLoader)
    loaders.push(compressLoader)
    return {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: loaders
    }
}
