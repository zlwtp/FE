module.exports = hook => {
    const getEnv = () => {
        // NODE_ENV
        const NODE_ENV = process.env.NODE_ENV || 'production'
        // 当前分支名
        const CI_COMMIT_REF_NAME = process.env.CI_COMMIT_REF_NAME || 'dev'
        // 当前commit hash值
        const CI_COMMIT_SHA = process.env.CI_COMMIT_SHA || 'abcdefgh'
        // 增量目标分支
        const DM_INC_BRANCH = process.env.DM_INC_BRANCH || 'dev'
        // 增量目标环境
        const DM_INC_NPM = process.env.DM_INC_NPM || 'dev'

        // 项目环境
        const DM_PROJECT_ENV = process.env.CI ? DM_INC_NPM : 'dev-server'
        // 根目录
        const DM_ROOT_PATH = process.cwd()
        // CDN目录
        const DM_ASSET_PATH = 'stc'
        // 打包目录
        const DM_DIST_DIR = 'dist'
        // 版本号
        const DM_VERSION = `0.0.1-${DM_PROJECT_ENV}.${CI_COMMIT_SHA}`
        // CDN地址
        const DM_CDN_URL = `https://stc${DM_INC_NPM === 'pd' ? '' : `-${DM_INC_NPM}`}.2haohr.com/`
        // 运行模式： 'analysis-size' 本地分析包体积模式 'analysis-size-to-json' 输出分析包体积文件模式  '' 其他
        const DM_RUN_MODE = process.env.RUN_MODE || ''

        return {
            ...process.env,
            FORCE_COLOR: true,
            NODE_ENV,
            CI_COMMIT_REF_NAME,
            CI_COMMIT_SHA,
            DM_INC_BRANCH,
            DM_INC_NPM,
            DM_PROJECT_ENV,
            DM_ROOT_PATH,
            DM_ASSET_PATH,
            DM_DIST_DIR,
            DM_VERSION,
            DM_CDN_URL,
            DM_RUN_MODE
        }
    }

    return async ({ ctx, log }) => {
        const axios = require('axios')
        const exit = require('signal-exit')
        const env = getEnv()

        const operation = hook === 'deploy' ? '部署' : '编译'
        /*
         * TODO:支持多个任务并发执行
         * 按照依赖关系生成任务队列
         */
        const taskQueue = []
        Object.values(ctx.diffPkgs)
            .filter(pkg => {
                if (!pkg.dm[hook]) return false
                if (process.env.CI && pkg.dm.ci_skip) return false
                return true
            })
            .forEach(({ name, deps }) => {
                let index = -1
                deps.forEach(dep => {
                    const depIndex = taskQueue.indexOf(dep)
                    if (depIndex > index) {
                        index = depIndex
                    }
                })
                taskQueue.splice(index + 1, 0, name)
            })

        // 发生异常时杀死子进程
        let curr_child = ''
        exit(
            () => {
                curr_child && curr_child.kill('SIGHUP')
            },
            { alwaysLast: true }
        )

        const errorPkgs = []

        // 执行任务
        const fun = async key => {
            const { description, name, path } = ctx.diffPkgs[key]
            const command = `node ci/${hook}`
            const data = await new Promise(resolve => {
                log(`${command} ${description}:${name}`)
                const { fork } = require('child_process')

                curr_child = fork(`ci/${hook}`, {
                    stdio: 'inherit',
                    cwd: path,
                    env
                })
                curr_child.on('message', data => {
                    if (typeof data === 'object' && data.type === 'WEBPACK_BUILD_ERROR') {
                        errorPkgs.push(`<font color="warning">${name}</font>`)
                    }
                })
                curr_child.on('close', () => {
                    resolve(true)
                })
            })
            return data
        }
        if (hook === 'devServer') {
            // eslint-disable-next-line no-restricted-syntax
            for (const key of taskQueue) {
                // eslint-disable-next-line no-await-in-loop
                await fun(key)
            }
        } else {
            const { cpus } = require('os')
            const pLimit = require('p-limit')
            const cpu_num = process.env.DM_BATCH_BUILD === 'on' ? cpus().length - 1 : 1
            console.log(`CPU个数：${cpus().length},当前使用${cpu_num}个`)
            const limit = pLimit(cpu_num) // 子进程限流个数

            console.log(`编译总共：${taskQueue.length}个`)
            const dlls = taskQueue.filter(item => item.endsWith('-lib/dll'))
            const firstTasks = taskQueue.filter(
                item => item.startsWith('@2haohr-lib') || item === '@2haohr-server/print-template'
            )
            console.log('dlls', dlls)
            console.log('firstTasks', firstTasks)

            console.time('build')
            await Promise.all(
                dlls.map((fn, item) =>
                    limit(async () => {
                        log(`dlls${operation}总共${dlls.length}个：当前第${item + 1}个`)
                        await fun(fn)
                    })
                )
            )
            dlls.length && console.log('dlls已完成')
            await Promise.all(
                firstTasks.map((fn, item) =>
                    limit(async () => {
                        log(`firstTasks${operation}总共${firstTasks.length}个：当前第${item + 1}个`)
                        await fun(fn)
                    })
                )
            )
            firstTasks.length && console.log('firstTasks已完成')
            const tasks = taskQueue.filter(
                item =>
                    !item.endsWith('-lib/dll') &&
                    !(item.startsWith('@2haohr-lib') || item === '@2haohr-server/print-template')
            )
            await Promise.all(
                tasks.map((fn, item) =>
                    limit(async () => {
                        log(`业务${operation}总共${tasks.length}个：当前第${item + 1}个`)
                        await fun(fn)
                    })
                )
            )
            console.timeEnd('build')
            log(`
            ********************************************************************************
            ******************************** ${operation}结束 ************************************
            ********************************************************************************
            `)
        }
        // 子进程任务执行失败，触发消息机器人通知
        if (process.env.DM_SEND_WECHAT_WEBHOOK && errorPkgs.length > 0) {
            const jobid = process.env.CI_JOB_ID
            const envName = `${process.env.DM_INC_NPM}`.toUpperCase()
            const content = [
                `[CI任务${jobid}](http://gitlab-test.dianmi365.com/dianmi-fe/2haohr/-/jobs/${jobid}) ${envName}环境异常,相关同事排查如下包`,
                ...errorPkgs
            ].join('\n')
            axios.post(process.env.DM_SEND_WECHAT_WEBHOOK, {
                msgtype: 'markdown',
                markdown: { content }
            })
        }
    }
}
