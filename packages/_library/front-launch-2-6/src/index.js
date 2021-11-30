/**
 * 获取webpack compiler 实例
 */
const getCompiler = config => {
    const webpack = require('webpack')
    return webpack(config)
}

/**
 * 处理webpack输出日志
 */
const log = (err, stats, exit = true) => {
    if (stats) {
        console.log(
            stats.toString({
                builtAt: false,
                timings: false,
                hash: false,
                version: false,
                modules: false,
                moduleTrace: false,
                chunks: false, // Makes the build much quieter
                colors: true,
                children: false // 不显示子进程日志
            })
        )
    } else {
        console.log(err)
    }
    if (err || stats.hasErrors()) {
        process.send && process.send({ type: 'WEBPACK_BUILD_ERROR' })
        exit && process.exit(1)
    }
}

/**
 * 实时运行
 */
class Runtime {
    constructor(option) {
        this.task = null
        this.ip = require('@2haohr/end-ip-address')()
        this.option = option

        this.check()
    }

    /**
     * 检查配置文件是否打开实时编译监听{ runtime: true }
     */
    check() {
        const { watch } = this.option
        const { readFileSync } = require('fs')
        const { runtime } = JSON.parse(readFileSync(watch.switchFile))

        if (runtime) {
            // 开启webpack watch
            this.task = !this.task && this.webpackWatch(this.option)
        } else if (this.task) {
            this.task.io.close()
            this.task.watching.close(() => {
                console.log(`${watch.name} 关闭监听`)
                this.task = null
            })
        }
    }

    watch() {
        const { option } = this
        const { watch } = this.option
        const self = this
        const gaze = require('gaze')
        gaze(watch.switchFile, function (err) {
            if (err) {
                console.log(err)
            }
            this.on('changed', () => {
                self.check(option)
            })
        })
    }

    webpackWatch() {
        const { watch } = this.option
        const { resolve } = require('path')
        const parser = require('./webpack')

        const host = process.env.inspect ? this.ip : '127.0.0.1'
        const channel = watch.name.replace(/@|\//g, '-')

        // 获取webpack配置
        const config = parser(this.option)
        // 插入socket client.js到entry中
        const client_path = `${resolve(__dirname, './_client.js')}?http://${host}:${watch.port}?channel=${channel}`
        Array.from([].concat(config)).forEach(item => {
            Object.keys(item.entry).forEach(name => {
                item.entry[name] = [client_path].concat(item.entry[name])
            })
        })
        // 获取webpack compiler实例
        const compiler = getCompiler(config)
        // 建立和中间人socket的通信
        const socket = require('socket.io-client')
        const io = socket(`http://${host}:${watch.port}`)
        // 当编译变化时通知中间人
        const { invalid, done } = compiler.hooks
        done.tap('webpack-dev-server', stats => {
            const { hash } = stats
            io.emit('hash', channel, hash)
        })
        invalid.tap('devServer', () => {
            console.log(`${watch.name} 编译中...`)
            io.emit('compiling', channel)
        })
        console.log(`${watch.name} 初次编译，请耐心等待...`)
        console.time('build')
        // 开始监听
        return {
            io,
            watching: compiler.watch({ aggregateTimeout: 600, ignored: /node_modules/ }, (err, stats) => {
                log(err, stats, false)
                console.timeEnd('build')
                console.log(`${watch.name} 编译完成!`)
                io.emit('refresh', channel, config.devServer.hot)
            })
        }
    }
}

module.exports = opt => {
    const getOption = require('./getOption')
    const option = getOption(opt)

    if (option.watch) {
        // 如果有watch配置，则开始动态监听
        const runtime = new Runtime(option)
        runtime.watch()
    } else {
        // 执行编译
        const webpack = require('./webpack')
        // 获取webpack配置
        const config = webpack(option)
        // 获取webpack compiler实例
        const compiler = getCompiler(config)

        return new Promise(resolve => {
            const start = new Date().getTime()
            compiler.run((err, stats) => {
                const { readFileSync } = require('fs')
                const { name, description } = JSON.parse(readFileSync(`${process.cwd()}/package.json`))
                console.log(`\n ----- 开始编译：${description} : ${name} ----- \n`)
                log(err, stats)
                console.log(`\n----- 结束编译：${description} : ${name}  ----- 
                \n
                编译耗时 :${Math.ceil((new Date().getTime() - start) / 1000)}秒
                \n
                ***************************************************************************************************************
                ***************************************************************************************************************
                ***************************************************************************************************************
                `)
                resolve('编译成功')
            })
        })
    }
}
