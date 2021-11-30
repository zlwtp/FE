
const { resolve } = require('path')
const { exec } = require('@2haohr/shell')

module.exports = (opt = {}) => {
    let {
        source = 'dist', // 源目录
        filter = '' // 需要过滤的文件类型
    } = opt

    const ROOT_PATH = process.cwd()
    const pkg = require(`${ROOT_PATH}/package.json`)
    const target = resolve(process.env.DM_ROOT_PATH, `./dist/cdn/${pkg.name.replace('@', '')}`)

    const commands = [
        `mkdir -p ${target}`// 创建文件夹
    ]

    if (filter) {
        commands.push(`find ${source} -name '${filter}' | cp \`xargs\` ${target}`)
    } else {
        commands.push(`cp -rf ${source}/* ${target}`)
    }

    exec(commands.join(' && '))
}
