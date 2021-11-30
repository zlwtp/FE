
/**
 * 使用方式
 * options: {
 *      colorMap: {
 *          '#cc0000': '--primary' // 将使用了#cc0000色值的声明，后方插入一条值为var(--primary)的语句
 *      }
 * }
 */

function colorMaptransfer(maps) {
    const rxps = Object.entries(maps).map(([
        color,
        tag
    ]) => [
        new RegExp(color, 'g'),
        tag
    ])
    return value => {
        let target = value
        rxps.forEach(([
            rxp,
            color
        ]) => {
            target = target.replace(rxp, `var(${color})`)
        })
        return target
    }
}

module.exports = function(options = {}) {
    const { colorMap } = options
    if (!colorMap) {
        throw new Error('请传入正确的colorMap')
    }
    const transfer = colorMaptransfer(colorMap)
    return {
        postcssPlugin: 'color2var',
        Root(root, postcss) {
            root.walkDecls(decl => {
                const target = transfer(decl.value)
                if (target !== decl.value) {
                    decl.cloneAfter({
                        prop: decl.prop,
                        value: target
                    })
                }
            })
        }
    }
}
