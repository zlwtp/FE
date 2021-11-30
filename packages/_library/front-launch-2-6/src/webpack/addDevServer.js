const path = require('path')

module.exports = (config, option) => {
    const { devServer, mode } = option
    if (mode === 'development') {
        config.devServer = {
            hot: true,
            contentBase: path.resolve(option.root, 'dist'),
            ...devServer
        }
    }
}
