const launch = require('@2haohr/front-launch-2-6')
const getOption = require('./getOption')

launch({
    ...getOption()
}).then(() => {
    const { writeFileSync, readFileSync } = require('fs')
    const version = process.env.DM_VERSION
    const { name } = JSON.parse(readFileSync(`${process.cwd()}/package.json`))

    console.log(`${name}正在生成version`, version)
    writeFileSync(`dist/version.js`, `module.exports = '${version}'`)
    console.log(`${name}生成version`, version)
})
