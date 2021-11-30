
module.exports = {
    loader: 'vue-loader',
    options: {
        hotReload: true,
        transformAssetUrls: {
            video: [
                'src',
                'poster'
            ],
            source: 'src',
            img: 'src',
            image: 'xlink:href',
            'd-icon': [
                'src',
                'type'
            ]
        }
    }
}
