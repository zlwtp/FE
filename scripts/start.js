/* eslint-disable no-bitwise */
const program = require('commander')
const getAllPkgs = require('./task/getAllPkgs')
const getStartPkgs = require('./task/getStartPkgs')
const getLatestVersion = require('./task/getLatestVersion')
const installDep = require('./task/installDep')
const runHook = require('./task/runHook')

const BASE = 1
const FETCH = 1 << 1
const INSTALL = 1 << 2
const BASE_OR_INSTALL = BASE | INSTALL
// 1 001
// 2 010
// 4 100
// 7 111

program.name('yarn start').usage('[port]').description('启动本地服务，port(可选)代表服务端口')

program.arguments('<mode> [port]').action((mode, port) => {
    process.env.NODE_ENV = 'development'
    const manager = require('./task/manager')
    const argsGroup = []

    if (Number(mode) & BASE_OR_INSTALL) {
        argsGroup.push(
            ...[
                [`解析所有包`, getAllPkgs],
                [`获取启动包`, getStartPkgs(port)]
            ]
        )
    }
    // 插入最新解析
    if (Number(mode) & FETCH) {
        const arg = [`解析最新版本`, getLatestVersion(`build_${process.env.DM_INC_NPM || 'dev'}`, false)]
        argsGroup.push(arg)
    }
    // 插入安装依赖
    if (Number(mode) & INSTALL) {
        const arg = [`安装依赖`, installDep]
        argsGroup.push(arg)
    }
    if (Number(mode) & BASE_OR_INSTALL) {
        const arg = [`执行钩子`, runHook('devServer')]
        argsGroup.push(arg)
    }

    console.log(argsGroup)
    // eslint-disable-next-line no-restricted-syntax
    for (const arg of argsGroup) {
        manager.task(...arg)
    }
    manager.start()
})

program.parse(process.argv)
