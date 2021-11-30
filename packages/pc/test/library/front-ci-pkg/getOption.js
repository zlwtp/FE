
const getOption = require('@2haohr-major/front-ci-option')

module.exports = (root = process.cwd()) => ({
    ...getOption(root),
    root,
    color2var: true
})
