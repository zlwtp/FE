/**
 * 构建脚本，仅CI可用
 */

const manager = require('./task/manager')

const getAllPkgs = require('./task/getAllPkgs')
const getLatestVersion = require('./task/getLatestVersion')
const getDiffPkgs = require('./task/getDiffPkgs')
const installDep = require('./task/installDep')
const runHook = require('./task/runHook')
const updateBuildVersion = require('./task/updateBuildVersion')

manager
    .task(`解析所有包`, getAllPkgs)
    .task(`解析最新版本`, getLatestVersion(`build_${process.env.DM_INC_NPM || 'dev'}`))
    .task(`获取diff包`, getDiffPkgs)
    .task(`安装依赖`, installDep)
    .task(`执行编译钩子`, runHook('build'))
    .task(`更新编译版本`, updateBuildVersion)
    .start()
