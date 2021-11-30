
module.exports = (config, option) => {
    const { externals } = option

    if (externals) {
        config.externals = externals
    }
}
