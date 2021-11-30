const { resolve } = require('path')
const root_path = resolve(__dirname, '../../../../node_modules')
const { readFileSync, existsSync } = require('fs')

module.exports = option => {
    const config = {
        loader: 'babel-loader',
        options: {
            compact: false,
            cacheDirectory: true,
            presets: [
                [`${root_path}/@vue/babel-preset-jsx`],
                [
                    `${root_path}/@babel/preset-env`,
                    {
                        targets: {
                            edge: '12',
                            chrome: '49',
                            ie: '10',
                            safari: '11'
                        }
                    }
                ]
            ],
            plugins: [
                `${root_path}/@babel/plugin-proposal-class-properties`,
                `${root_path}/@babel/plugin-proposal-nullish-coalescing-operator`,
                `${root_path}/@babel/plugin-proposal-optional-chaining`,
                `${root_path}/@babel/plugin-proposal-private-methods`,
                `${root_path}/@babel/plugin-syntax-dynamic-import`,
                `${root_path}/@babel/plugin-transform-named-capturing-groups-regex`
            ]
        }
    }
    if (option.pluginComponent) {
        const componentPath = `${option.root}/ci/component.json`
        if (existsSync(componentPath)) {
            const k = JSON.parse(readFileSync(componentPath))
            const arr = []
            for (const key in k) {
                if (k[key]) {
                    arr.push([
                        `${root_path}/babel-plugin-component`,
                        {
                            libraryName: key,
                            style: true
                        },
                        key
                    ])
                }
            }
            config.options.plugins.push(...arr)
        }
    }

    return config
}
