const { '7.2.5': polyfill } = require('@2haohr/cdn-babel-polyfill')
const { '2.6.10': vue } = require('@2haohr/cdn-vue')
const { lodash, moment } = require('@2haohr/cdn-three')
const getOption = require('@2haohr-major/front-ci-option')

const getTemplate = root => {
    root = root || process.cwd()
    const fs = require('fs')
    const path = require('path')
    const file_path = path.resolve(root, './ci/template.ejs')
    if (fs.existsSync(file_path)) {
        return file_path
    }
    return path.resolve(__dirname, './template.ejs')
}

const cdn = {
    polyfill,
    vue,
    lodash,
    moment
}
module.exports = (root = process.cwd()) => ({
    ...getOption(root),
    root,
    hash: process.env.NODE_ENV === 'production',
    template: {
        chunks: ['index'],
        template: getTemplate(root),
        chunksSortMode: 'none',
        filename: `index.html`,
        cdn: Object.values(cdn),
        tps: {
            version: process.env.DM_VERSION
        }
    },
    cssExtract: process.env.NODE_ENV === 'production',
    color2var: true
})
