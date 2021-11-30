
const { resolve } = require('path')
const mixin = require('@2haohr/front-sass-mixin')
const variable = require('@2haohr/front-sass-variable')

const styleLoader = {
    loader: 'style-loader',
    options: {
        transform: resolve(__dirname, './_transform_skin.js')
    }
}

const cssLoader = {
    loader: 'css-loader'
}

const sassLoader = option => ({
    loader: 'sass-loader',
    options: {
        data: `${Object.keys({ ...variable, ...option.environment }).map(key => `$${key}:${variable[key]};`)
            .join('\n')}
            ${mixin}
            ${option.sassMixin}`
    }
})

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                [
                    'autoprefixer',
                    {
                        Browserslist: [
                            'IE 10',
                            'Edge 12',
                            'Chrome 49',
                            'Safari 11',
                            '> 1%'
                        ]
                    }
                ]
            ]
        }
    }
}

const postcssLoader_color2var = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                [
                    'autoprefixer',
                    {
                        Browserslist: [
                            'IE 10',
                            'Edge 12',
                            'Chrome 49',
                            'Safari 11',
                            '> 1%'
                        ]
                    }
                ],
                [
                    resolve(__dirname, './_transform_color2var.js'),
                    {
                        colorMap: {
                            'linear-gradient\\(to right\\, #006946\\, #007d5f\\)': '--special-topbar',
                            '#0bb27a': '--primary',
                            '#59c993': '--select',
                            '#b4e7d4': '--light',
                            '#0aa974': '--shade-1',
                            '#0aa06e': '--shade-2',
                            'rgba\\(11\\, 178\\, 122\\, 0.2\\)': '--alpha-1',
                            'rgba\\(11\\, 178\\, 122\\, 0.9\\)': '--alpha-2',
                            '#23ba87': '--tint-1',
                            '#3cc195': '--tint-2',
                            '#54c9a2': '--tint-3',
                            '#6dd1af': '--tint-4',
                            '#85d9bd': '--tint-5',
                            '#9de0ca': '--tint-6',
                            '#b6e8d7': '--tint-7',
                            '#cef0e4': '--tint-8',
                            '#e7f7f2': '--tint-9'
                        }
                    }
                ]
            ]
        }
    }
}

const cssLoader_module = {
    loader: 'css-loader',
    options: {
        // 开启 CSS Modules
        modules: true,
        // 自定义生成的类名
        localIdentName: '[local]_[hash:base64:5]'
    }
}

const styleLoader_insertbefore = {
    loader: 'style-loader',
    options: {
        insertAt: 'top'
    }
}

const styleLoader_insertbefore_transformSkin = {
    loader: 'style-loader',
    options: {
        insertAt: 'top',
        transform: resolve(__dirname, './_transform_skin.js')
    }
}

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssExtractLoader = options => ({
    loader: MiniCssExtractPlugin.loader,
    options
})

module.exports = {
    styleLoader,
    cssLoader,
    sassLoader,
    postcssLoader,
    postcssLoader_color2var,
    cssLoader_module,
    styleLoader_insertbefore,
    styleLoader_insertbefore_transformSkin,
    cssExtractLoader
}
