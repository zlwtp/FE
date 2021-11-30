
module.exports = option => {
    const htmlLoader = require('./loader/html')

    return {
        test: /\.html$/,
        use: [htmlLoader]
    }
}
