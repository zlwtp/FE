
const asset = process.env.DM_ASSET_PATH
const min = process.env.NODE_ENV === 'production' ? '.min' : ''

module.exports = {
    '6.26.0': `/${asset}/2haohr/cdn-babel-polyfill/6.26.0/polyfill${min}.js`,
    '7.2.5': `/${asset}/2haohr/cdn-babel-polyfill/7.2.5/polyfill${min}.js`
}
