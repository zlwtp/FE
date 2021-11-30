
module.exports = option => {
    const babelLoader = require('./loader/babel')(option)
    
    return {
        test: /\.js$/,
        exclude: file => (/node_modules/).test(file) && !(/\.vue\.js/).test(file),
        // Exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)) && !(/@2haohr/.test(file)),
        use: [babelLoader]
    }
}
