
import color from 'css-color-function'

export default colors => {
    const formula = {
        'shade-1': 'color(primary shade(5%))',
        'shade-2': 'color(primary shade(10%))',
        'alpha-1': 'color(primary alpha(20%))',
        'alpha-2': 'color(primary alpha(90%))',
        'tint-1': 'color(primary tint(10%))',
        'tint-2': 'color(primary tint(20%))',
        'tint-3': 'color(primary tint(30%))',
        'tint-4': 'color(primary tint(40%))',
        'tint-5': 'color(primary tint(50%))',
        'tint-6': 'color(primary tint(60%))',
        'tint-7': 'color(primary tint(70%))',
        'tint-8': 'color(primary tint(80%))',
        'tint-9': 'color(primary tint(90%))'
    }
    colors = Object.assign({}, colors)
    Object.keys(formula).forEach(key => {
        const value = formula[key].replace(/primary/g, colors.primary)
        colors[key] = color.convert(value)
    })
    return colors
}
