/**
 * 安装模块依赖
 */
const gaze = require('gaze')
const { resolve } = require('path')
const { existsSync } = require('fs')
const { emptyDirSync, outputFileSync, outputJSONSync, copySync, readJsonSync } = require('fs-extra')
const { exec } = require('shelljs')

const getReleasePkgs = (allPkgs, diffPkgs) => {
    const releasePkgs = {}
    Object.values(diffPkgs).forEach(({ name, deps }) => {
        releasePkgs[name] = allPkgs[name]
        deps.forEach(dep => {
            if (allPkgs[dep]) {
                releasePkgs[dep] = allPkgs[dep]
            }
        })
    })
    return releasePkgs
}

const installRelease = async (releasePkgs, release) => {
    if (release) {
        // 解压到模块dist目录
        Object.values(releasePkgs).forEach(pkg => {
            const sourceDir = resolve(release, `./${pkg.name.replace('@', '')}`)
            const destDir = resolve(pkg.realPath, './dist')

            if (existsSync(sourceDir)) {
                // 删除dist目录
                emptyDirSync(destDir)
                // 复制文件夹
                copySync(sourceDir, destDir)
            }
        })
    }
}

const watchPath = (filepath, callback) => {
    gaze(filepath, (err, watcher) => {
        if (err) {
            console.log(err)
        }
        watcher.on('changed', filepath2 => {
            callback && callback(filepath2)
        })
    })
}

const createRuntimeJS = (jsPath, runtime, name) => {
    const runtimeLog = runtime ? `console.log('${name}开启实时编译');` : ''
    outputFileSync(
        jsPath,
        `${runtimeLog}module.exports = require('${runtime ? '../src/index.js' : '../dist/index.js'}')`
    )
}

const createRuntime = (pkg, configPath, jsPath) => {
    // 写入默认 rutime.config.json
    if (!existsSync(configPath)) {
        outputJSONSync(configPath, { name: pkg.name, runtime: false })
    }

    const { name, runtime } = readJsonSync(configPath)
    if (name !== pkg.name) {
        outputJSONSync(configPath, { name: pkg.name, runtime: Boolean(runtime) })
    }

    // 写入 rutime.js
    createRuntimeJS(jsPath, runtime, pkg.name)
}

const installRuntime = async (releasePkgs, allPkgs) => {
    Object.values(releasePkgs).forEach(pkg => {
        const configPath = resolve(pkg.realPath, './.dm/runtime.config.json')
        const jsPath = resolve(pkg.realPath, './.dm/runtime.js')

        createRuntime(pkg, configPath, jsPath)

        if (!process.env.CI) {
            watchPath(configPath, () => {
                createRuntime(pkg, configPath, jsPath)
            })
        }
        if (pkg.dm.devServer) {
            const pkgConfigPath = resolve(pkg.realPath, './.dm/pkg.config.json')
            const deps = pkg.deps.concat(pkg.name)

            outputJSONSync(pkgConfigPath, {
                contentBase: deps.map(name => resolve(allPkgs[name].realPath, './node_modules'))
            })
        }
    })
}

let retryNum = 1

const lernaBootstrap = async scopes => {
    console.log(
        `node node_modules/lerna/cli.js bootstrap ${scopes} --mutex network --include-dependencies --registry https://npm-2haohr.dianmi365.com/ --loglevel silent`
    )
    const result = await exec(
        `node node_modules/lerna/cli.js bootstrap ${scopes} --mutex network --include-dependencies --registry https://npm-2haohr.dianmi365.com/ --loglevel silent`
    )
    console.log(result)
    if (result.code !== 0) {
        if (retryNum > 1) {
            const axios = require('axios')
            const jobid = process.env.CI_JOB_ID
            const envName = `${process.env.DM_INC_NPM}`.toUpperCase()
            const content = [
                `[CI任务${jobid}](http://gitlab-test.dianmi365.com/dianmi-fe/2haohr/-/jobs/${jobid}) ${envName}环境安装依赖失败，请关注`
            ].join('\n')
            await axios.post(process.env.DM_SEND_WECHAT_WEBHOOK, {
                msgtype: 'markdown',
                markdown: { content }
            })
            process.exit(result.code)
        }
        console.log(result)
        console.log(`第${retryNum}次安装依赖失败，正在重试`)
        retryNum++
        await lernaBootstrap(scopes)
    }
}

const installDependency = async releasePkgs => {
    const pkgs = Object.values(releasePkgs).filter(pkg => {
        if (process.env.CI && pkg.dm.ci_skip) return false
        return true
    })

    pkgs.forEach(pkg => {
        pkg.deps.forEach(key => {
            if (releasePkgs[key]) {
                releasePkgs[key].notInstall = true
            }
        })
    }, {})

    // TODO: 重写依赖安装，放弃Lerna
    const scopes = pkgs
        .filter(pkg => !pkg.notInstall)
        .map(pkg => `--scope ${pkg.name}`)
        .join(' ')
    if (scopes) {
        await lernaBootstrap(scopes)
    }

    /*
     * TODO: 监听package.json变化安装依赖
     * if (!process.env.CI) {
     *     pkgs.forEach(pkg => {
     *         const configPath = resolve(pkg.realPath, './package.json')
     *         watchPath(configPath, () => {
     *             console.log(pkg._installing, JSON.parse(require('fs').readFileSync(configPath)))
     *             if (!pkg._installing) {
     *                 console.log(`${pkg.name} 安装依赖`)
     *                 pkg._installing = true
     *                 execSync(getInstallDepCommand(pkg), {}, false)
     *                 pkg._installing = false
     *             }
     *         })
     *     })
     * }
     */
}

module.exports = async ({ ctx, log }) => {
    const releasePkgs = getReleasePkgs(ctx.allPkgs, ctx.diffPkgs)

    log('安装release')
    await installRelease(releasePkgs, ctx.release)
    log('安装runtime')
    await installRuntime(releasePkgs, ctx.allPkgs)
    log('安装模块依赖')
    await installDependency(releasePkgs)
}
