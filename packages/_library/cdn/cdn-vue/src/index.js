
const asset = process.env.DM_ASSET_PATH
const min = process.env.NODE_ENV === 'production' ? '.min' : ''

module.exports = {
    '2.4.4': `/${asset}/2haohr/cdn-vue/2.4.4/vue${min}.js`,
    '2.5.16': `/${asset}/2haohr/cdn-vue/2.5.16/vue${min}.js`,
    '2.6.6': `/${asset}/2haohr/cdn-vue/2.6.6/vue${min}.js`,
    '2.6.8': `/${asset}/2haohr/cdn-vue/2.6.8/vue${min}.js`,
    '2.6.10': `/${asset}/2haohr/cdn-vue/2.6.10/vue${min}.js`,
    '3.0.0': `/${asset}/2haohr/cdn-vue/3.0.0/vue${min}.js`
}
