
const { resolve } = require('path')
const { exec } = require('@2haohr/shell')

module.exports = (option = {}) => {
    const {
        exclude = []// 需要排除的目录
    } = option

    const CI_COMMIT_SHA = process.env.CI_COMMIT_SHA
    const projectEnv = process.env.DM_PROJECT_ENV
    const version = `0.0.1-${CI_COMMIT_SHA ? CI_COMMIT_SHA.substr(0, 8) : 'abcdef'}`
    const distDir = './dist'
    const zipFile = './dist/release.tar.gz'
    const rootDockerDir = resolve(process.env.DM_ROOT_PATH, `./dist/docker`)
    const pkg = require(`${process.cwd()}/package.json`)
    const pkgName = pkg.name.replace(/\//g, '-').substr(1)
    const imgName = `registry.2haohr.com/2haohr-fe/${pkgName}-${projectEnv}:${version}`
    const excludeStr = [zipFile].concat(exclude).map(f => `--exclude='${f}'`)
        .join(' ')

    const commands = [
        `mkdir -p ${distDir}`,
        `tar ${excludeStr} -hczf ${zipFile} *`,
        `docker build -t ${imgName} --build-arg DM_PROJECT_ENV=${projectEnv}  - < ${zipFile}`,
        `docker push ${imgName}`,
        `mkdir -p ${rootDockerDir}`,
        `echo "-n ${imgName} -p ${pkgName} -e ${projectEnv}" >> ${rootDockerDir}/release.txt`
    ]

    // exec(commands.join(' && '))

    for (const command of commands) {
        console.log(command)
        exec(command)
    }
}
