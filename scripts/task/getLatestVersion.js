module.exports = (tag, deploy) => async ({ ctx, log }) => {
        const execNR = require('../command/execNR')
        const unzip = require('../command/unzip')
        const exec = require('../command/exec')
        const axios = require('axios')
        const { emptyDirSync, readFileSync, existsSync } = require('fs-extra')
        const DIR = `./.dm/tag` // 下载目录
        let release = '' // 解压目录
        let gitHead = '' // 版本commit hash
        let releaseVersion = ''
        let releaseGitHead = ''

        const { name } = require(`${process.cwd()}/package.json`)
        if (!process.env.CI || process.env.DM_INC_SWITCH === 'on') {
            log('从npm获取当前版本')
            // const npmrc = readFileSync('.npmrc', 'utf8')
            // const token = /npm.dianmi365.com\/:_authToken="([\s\S]*)"/giu.exec(npmrc)[1]
            // 解析最新版本
            // const { data: npmInfo } = await axios.get(`http://npm.dianmi365.com/${name}`, {
            //     headers: {
            //         'Accept-Encoding': 'gzip',
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            // const version = npmInfo['dist-tags'][tag]
            const version = ''
            gitHead = '38a14c4e8c6fbe4fa3b69c4bbd7ccbb190a48501'
            // if (version) {
            // }
            log(`当前版本 ${version} —— gitHead:${gitHead}`)
            log(`获取release版本`)
            if (process.env.DM_INC_NPM !== 'pd') {
                if (deploy) {
                    // Deploy模式解压当前分支环境对应tag
                    releaseVersion = `0.0.1-${process.env.DM_INC_NPM}.${process.env.CI_COMMIT_SHA}`
                } else {
                    releaseVersion = '0.0.1-dev.d182170de05c52179a2a52e357828ab6c8e2efa0'
                }
                log(`当前版本 ${releaseVersion}`)
                if (releaseVersion) {
                    const zipFile = `${DIR}/${releaseVersion}.tar`
                    console.log(zipFile)
                    if (!existsSync(zipFile)) {
                        // 判断是否已下载
                        // emptyDirSync(DIR)
                        const { CI_JOB_ID } = npmInfo.versions[releaseVersion]
                        if (CI_JOB_ID) {
                            log(`下载artifacts > ${zipFile}`)
                            log(`CI_JOB_ID > ${CI_JOB_ID}`)
                            await execNR(
                                `curl --output ${zipFile} --header "PRIVATE-TOKEN: ${
                                    process.env.DM_GITLAB_TOKEN || 'EyNC3FqkPayW8yS4pTxy'
                                }" "https://gitlab-test.dianmi365.com/api/v4/projects/${
                                    process.env.CI_PROJECT_ID || 250
                                }/jobs/${CI_JOB_ID}/artifacts"`
                            )
                        }
                    }
                    release = `${DIR}/release`

                    log(`解压release版本 > ${release}`)
                    if (!existsSync(release)) {
                        await unzip(zipFile, DIR)
                    }
                    if (process.env.CI) {
                        await unzip(zipFile)
                    }
                }
            } else {
                if (deploy) {
                    // Deploy模式解压当前分支环境对应tag
                    releaseVersion = `0.0.1-${process.env.DM_INC_NPM}.${process.env.CI_COMMIT_SHA}`
                    const rs = await exec(`git ls-remote -t origin | grep v${releaseVersion}`)
                    console.log('ls-remote', rs)
                    releaseGitHead = rs.toString().split('\t')[0]
                } else {
                    releaseVersion = version
                    releaseGitHead = gitHead
                }
                log(`release版本 ${releaseVersion}:${releaseGitHead}`)
                if (releaseVersion) {
                    const zipFile = `${DIR}/${releaseVersion}.tar`
                    if (!existsSync(zipFile)) {
                        // 判断是否已下载
                        emptyDirSync(DIR)
                        log(`git fetch origin v${releaseVersion}`)
                        await execNR(`git fetch origin v${releaseVersion}`)
                        if (deploy) {
                            log(`git fetch origin v${version}`)
                            await execNR(`git fetch origin v${version}`)
                        }
                        log(`git archive -o ${zipFile} ${releaseGitHead} release`)
                        await execNR(`git archive -o ${zipFile} ${releaseGitHead} release`)
                    }

                    release = `${DIR}/release`
                    log(`解压release版本 > ${release}`)
                    if (!existsSync(release)) {
                        await unzip(zipFile, DIR)
                    }
                    if (process.env.CI) {
                        await unzip(zipFile)
                    }
                }
            }
        }

        if (process.env.DM_INC_SWITCH === 'off' && deploy) {
            log(`获取release版本`)
            releaseVersion = `0.0.1-${process.env.DM_INC_NPM}.${process.env.CI_COMMIT_SHA}`
            const rs = await exec(`git ls-remote -t origin | grep v${releaseVersion}`)
            releaseGitHead = rs.toString().split('\t')[0]
            log(`release版本 ${releaseVersion}:${releaseGitHead}`)

            if (releaseVersion) {
                const zipFile = `${DIR}/${releaseVersion}.tar`
                if (!existsSync(zipFile)) {
                    // 判断是否已下载
                    emptyDirSync(DIR)
                    if (process.env.DM_INC_NPM === 'pd') {
                        log(`git fetch origin v${releaseVersion}`)
                        await execNR(`git fetch origin v${releaseVersion}`)
                        log(`git archive -o ${zipFile} ${releaseGitHead} release`)
                        await exec(`git archive -o ${zipFile} ${releaseGitHead} release`)
                    } else {
                        log('从npm获取当前版本')
                        const npmrc = readFileSync('.npmrc', 'utf8')
                        const token = /npm.dianmi365.com\/:_authToken="([\s\S]*)"/giu.exec(npmrc)[1]
                        // 解析最新版本
                        const { data: npmInfo } = await axios.get(`http://npm.dianmi365.com/${name}`, {
                            headers: {
                                'Accept-Encoding': 'gzip',
                                Authorization: `Bearer ${token}`
                            }
                        })
                        const { CI_JOB_ID } = npmInfo.versions[releaseVersion]
                        if (CI_JOB_ID) {
                            log(`下载artifacts > ${zipFile}`)
                            log(`CI_JOB_ID > ${CI_JOB_ID}`)
                            await execNR(
                                `curl --output ${zipFile} --header "PRIVATE-TOKEN: ${
                                    process.env.DM_GITLAB_TOKEN || 'EyNC3FqkPayW8yS4pTxy'
                                }" "https://gitlab-test.dianmi365.com/api/v4/projects/${
                                    process.env.CI_PROJECT_ID || 250
                                }/jobs/${CI_JOB_ID}/artifacts"`
                            )
                        }
                    }
                }

                release = `${DIR}/release`
                log(`解压release版本 > ${release}`)
                if (!existsSync(release)) {
                    await unzip(zipFile, DIR)
                }
                if (process.env.CI) {
                    await unzip(zipFile)
                }
            }
        }

        ctx.gitHead = gitHead
        ctx.release = release
    }
