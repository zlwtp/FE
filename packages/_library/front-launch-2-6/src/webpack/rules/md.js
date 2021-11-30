module.exports = option => {
    const markdownLoader = require('./loader/markdown')
    const vueLoader = require('./loader/vue')

    return {
        test: /\.md$/,
        use: [
            vueLoader,
            markdownLoader
        ]
    }
}
