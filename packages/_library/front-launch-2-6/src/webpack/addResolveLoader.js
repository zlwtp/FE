module.exports = (config, option) => {
    const { resolve } = require('path')
    const { root } = option

    config.resolveLoader.modules.push('node_modules')
    config.resolveLoader.modules.push(resolve(root, './node_modules'))
    config.resolveLoader.modules.push(resolve(__dirname, '../../node_modules'))
}
