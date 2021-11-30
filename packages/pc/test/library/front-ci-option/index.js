const fs = require('fs')
const path = require('path')

module.exports = root => {
    // 获取配置文件 优先级高 ci/config.js
    let config = {}
    const config_path = path.join(root, 'ci', 'config.js')
    if (fs.existsSync(config_path)) {
        config = require(config_path)
    }

    // 默认配置 优先级低
    const defaultConfig = {
        externals: {
            vue: {
                root: 'Vue',
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue'
            },
            moment: 'moment',
            lodash: {
                commonjs: 'lodash', // 如果我们的库运行在Node.js环境中，import _ from 'lodash'等价于const _ = require('lodash')
                commonjs2: 'lodash', // 同上
                amd: 'lodash', // 如果我们的库使用require.js等加载,等价于 define(["lodash"], factory);
                root: '_' // 如果我们的库在浏览器中使用，需要提供一个全局的变量‘_’，等价于 var _ = (window._) or (_);
            }
        },
        alias: {
            '@src': `${root}/src`,
            '@components': `${root}/src/components`,
            '@util': `${root}/src/util`
        }
    }

    // 合并对象
    const ret = Object.entries(config).reduce((obj, [key, value]) => {
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                obj[key] = [...obj[key], ...value]
            } else {
                obj[key] = {
                    ...obj[key],
                    ...value
                }
            }
        } else {
            obj[key] = value
        }
        return obj
    }, defaultConfig)

    return ret
}
