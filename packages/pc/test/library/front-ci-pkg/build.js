const launch = require('@2haohr/front-launch-2-6')
const getOption = require('./getOption')

launch({
    ...getOption()
}).then(() => {
    const { writeFileSync, readFileSync } = require('fs')
    const { name } = JSON.parse(readFileSync(`${process.cwd()}/package.json`))
    const version = process.env.CI_JOB_ID

    console.log(`${name}正在生成version`, version)
    writeFileSync(`dist/version.js`, `module.exports = '${version}'`)
    writeFileSync(`dist/index${version}.js`, readFileSync('dist/index.js'))
    console.log(`${name}已生成version`, version)
})
