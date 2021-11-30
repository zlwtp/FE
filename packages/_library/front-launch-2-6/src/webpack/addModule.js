module.exports = (config, option) => {
    const js = require('./rules/js')
    const css = require('./rules/css')
    const scss = require('./rules/scss')
    const vue = require('./rules/vue')
    const html = require('./rules/html')
    const md = require('./rules/md')
    const icon = require('./rules/icon')
    const font = require('./rules/font')
    const image = require('./rules/image')

    const rules = Array.from([].concat(
        js(option),
        css(option),
        scss(option),
        vue(option),
        html(option),
        md(option),
        icon(option),
        font(option),
        image(option)
    ))

    config.module = {
        rules
    }
}
