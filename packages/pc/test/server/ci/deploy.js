
const pack = require('@2haohr/pack-docker')
const { devDependencies = {} } = require('../package.json')

pack({
    // 排除前端依赖
    exclude: [
        '@2haohr-major-front/*/node_modules',
        '@2haohr-major/*/node_modules',
        ...Object.keys(devDependencies).map(item => `${item}/*`)
    ]
})
