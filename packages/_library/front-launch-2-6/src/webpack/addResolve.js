
module.exports = (config, option) => {
    const path = require('path')
    const { alias, root } = option
    const resolve = {
        // Symlinks: false,
        modules: [
            'node_modules',
            path.resolve(root, './node_modules'),
            path.resolve(__dirname, '../../node_modules')
        ]
    }

    if (alias) {
        resolve.alias = alias
    }

    config.resolve = resolve
}
