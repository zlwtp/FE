
module.exports = (config, option) => {
    const path = require('path')
    const { publicPath, library, libraryTarget, dist, hash, chunkhash, root } = option

    const output = {}

    if (publicPath) {
        output.publicPath = publicPath
    }
    if (library) {
        output.library = library
    }
    if (libraryTarget) {
        output.libraryTarget = libraryTarget
    }
    if (dist) {
        output.path = path.resolve(root, dist)
    }

    if (!hash) {
        output.filename = '[name].js'
    }
    if (!chunkhash) {
        output.chunkFilename = '[name].js'
    }

    config.output = {
        filename: '[name].[hash:9].js',
        chunkFilename: '[name].[chunkhash:9].js',
        crossOriginLoading: 'anonymous',
        ...config.output,
        ...output
    }
}
