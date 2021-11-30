
module.exports = async({ ctx, log }) => {
    const { resolve } = require('path')
    const { existsSync, readdirSync, writeFileSync } = require('fs')
    const execNR = require('../command/execNR')
    const exec = require('../command/exec')
    const axios = require('axios')
    const releaseDir = './release'

    const version = `0.0.1-${process.env.DM_INC_NPM}.${process.env.CI_COMMIT_SHA}`

    log(`更新release目录`)
    for (const pkg of Object.values(ctx.diffPkgs)) {
        if (pkg.dm.build) {
            const dist_dir = resolve(pkg.realPath, './dist')
            if (existsSync(dist_dir)) {
                const slugPath = `./release/${pkg.name.replace('@', '')}`
                await execNR(`rm -rf ${slugPath} && mkdir -p ${slugPath} && cp -rf ${dist_dir}/* ${slugPath}`)
            }
        }
    }

    log(`清空release目录`)
    for (const namespace of readdirSync(releaseDir)) {
        for (const name of readdirSync(`${releaseDir}/${namespace}`)) {
            const pkgName = `@${namespace}/${name}`
            if (!ctx.allPkgs[pkgName]) {
                // 删除目录
                await execNR(`rm -rf ${releaseDir}/${namespace}/${name}`)
            }
        }
    }
    log(`升级版本号`)
    const pkgJSONPath = resolve(process.cwd(), 'package.json')
    const pkgJSON = require(pkgJSONPath)
    const upgradeVariable = {
        CI_JOB_ID: process.env.CI_JOB_ID
    }
    writeFileSync(pkgJSONPath, JSON.stringify(Object.assign(pkgJSON, upgradeVariable), null, 2))

    await execNR(`npm version --no-git-tag-version ${version}`)
    log(`生成版本tag`)
    await execNR(`git config --global user.email "gitlab-ci-dianmife@dianmi365.com" && git config --global user.name "gitlab-ci-dianmife"`)
    await execNR(`git config --global push.default simple && git remote set-url --push origin ${process.env.DM_GIT_ADDRESS}/2haohr.git`)
    await execNR(`git add package.json`)
    if(process.env.DM_INC_NPM === "pd") {
        await execNR(`git add release`)
    }
    await execNR(`git commit -m 'release v${version}' -n -q`)
    await execNR(`git tag v${version}`)

    let count = 1
    let isSuccess = false
    while(!isSuccess && count <= 3) {
        try {
            log(`开始push`)
            await execNR(`git push origin v${version}`)
            log("查询tag")
            const hasTag = await exec(`git ls-remote -t origin | grep v${version}`)
            log(hasTag)
            if(hasTag) {
                isSuccess = true
            } else {
                if (process.env.DM_SEND_WECHAT_WEBHOOK) {
                    log(`开始推送机器人通知`)
                    const jobid = process.env.CI_JOB_ID
                    const envName = `${process.env.DM_INC_NPM}`.toUpperCase()
                    const content = [
                        `[CI任务${jobid}](http://gitlab-test.dianmi365.com/dianmi-fe/2haohr/-/jobs/${jobid}) ${envName}环境git tag 生成失败正在第${count}次重试，请关注`
                    ].join('\n')
                    axios.post(process.env.DM_SEND_WECHAT_WEBHOOK, {
                        msgtype: 'markdown',
                        markdown: { content }
                    })
                }
                log(`第${count}次push失败，正在重试`)
                count++
                if(count > 3) {
                    log(`重试3次失败，正在退出`)
                    process.exit(1)
                }
            }
        } catch(err) {
            log("push发生失败")
        }
    }

    log(`发布私有npm服务`)
    await execNR(`echo -e $DM_NPMRC > .npmrc`)
    await execNR(`npm publish --tag build_${process.env.DM_INC_NPM}`)
}
