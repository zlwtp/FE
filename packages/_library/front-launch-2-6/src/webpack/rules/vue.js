module.exports = option => {
    const vueLoader = require('./loader/vue')

    return {
        test: /\.vue$/,
        use: [vueLoader]
    }
}
