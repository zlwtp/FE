
module.exports = (config, option) => {
    const { resolve } = require('path')
    const cdnEntryPath = resolve(__dirname, './_cdnEntry.js')
    let { entry, root, dll } = option

    if (Array.isArray(entry) || typeof entry === 'string') {
        entry = {
            index: [cdnEntryPath].concat(resolve(root, entry))
        }
    } else if (typeof entry === 'object') {
        Object.keys(entry).forEach(key => {
            const entries = [].concat(entry[key]).map(item => {
                if (item.startsWith('./')) {
                    return resolve(root, item)
                }
                return item
            })
            if (!dll) {
                entry[key] = [cdnEntryPath].concat(entries)
            }
        })
    }

    config.entry = entry
}
