module.exports = option => {
    const { cssExtract, color2var, publicStaticPath } = option
    const { styleLoader, cssLoader, postcssLoader, cssLoader_module, styleLoader_insertbefore, styleLoader_insertbefore_transformSkin, cssExtractLoader, postcssLoader_color2var } = require('./loader/style')

    return {
        test: /\.css$/,
        oneOf: [
            {
                resourceQuery: /(?=.*module)(?=.*insertbefore)/, // 匹配是按照先后的，如果放在后面会被其他正则先匹配，比如 /module/
                use: [
                    color2var ? styleLoader_insertbefore : styleLoader_insertbefore_transformSkin,
                    cssLoader_module,
                    color2var ? postcssLoader_color2var : postcssLoader
                ]
            },
            {
                resourceQuery: /module/,
                use: [
                    cssExtract ? cssExtractLoader({
                        publicPath: publicStaticPath
                    }) : styleLoader,
                    cssLoader_module,
                    color2var ? postcssLoader_color2var : postcssLoader
                ]
            },
            {
                resourceQuery: /insertbefore/,
                use: [
                    color2var ? styleLoader_insertbefore : styleLoader_insertbefore_transformSkin,
                    cssLoader,
                    color2var ? postcssLoader_color2var : postcssLoader
                ]
            },
            {
                use: [
                    cssExtract ? cssExtractLoader({
                        publicPath: publicStaticPath
                    }) : styleLoader,
                    cssLoader,
                    color2var ? postcssLoader_color2var : postcssLoader
                ]
            }
        ]
    }
}
