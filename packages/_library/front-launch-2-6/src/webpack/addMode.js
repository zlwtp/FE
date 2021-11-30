
module.exports = (config, option) => {
    const { mode } = option

    if (mode) {
        config.mode = mode
    }
}
