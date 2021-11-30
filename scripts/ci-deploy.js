/**
 * 部署脚本，仅CI可用
 */

const manager = require('./task/manager')

const getAllPkgs = require('./task/getAllPkgs')
const getLatestVersion = require('./task/getLatestVersion')
const getDiffPkgs = require('./task/getDiffPkgs')
const installDep = require('./task/installDep')
const runHook = require('./task/runHook')
const updateDeployVersion = require('./task/updateDeployVersion')

manager
    .task(`解析所有包`, getAllPkgs)
    .task(`解析最新版本`, getLatestVersion(`${process.env.DM_INC_NPM || 'dev'}`, true))
    .task(`获取diff包`, getDiffPkgs)
    .task(`安装依赖`, installDep)
    .task(`执行部署钩子`, runHook('deploy'))
    .task(`更新部署版本`, updateDeployVersion)
    .start()
