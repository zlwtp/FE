/**
 * 增强shelljs
 */

const shell = require('shelljs')

// const cat = shell.cat
// const cd = shell.cd
// const cp = shell.cp
// const echo = shell.echo
// const exec = shell.exec
// const exit = shell.exit
// const find = shell.find
// const ls = shell.ls
// const mkdir = shell.mkdir
// const pwd = shell.pwd
// const rm = shell.rm
// const test = shell.test

/**
 * Executes a command and returns the output instead of printing it to stdout.
 * @param {string} cmd The command string to execute.
 * @returns {string} The result of the executed command.
 */
const execSilent = cmd => shell.exec(cmd, { silent: true }).stdout.replace(/^\s+|\s+$/g, '')

const isWindows = process.platform === 'win32'
let exec = shell.exec
if (isWindows) {
    // shelljs默认使用cmd.exe 改用git bash.exe
    const path = require('path')
    const [gitcmd] = process.env.Path.match(/([^;]+Git\\cmd)/)
    const gitbash = path.resolve(gitcmd, '../bin/bash.exe')
    exec = (cmd, option = {}) => {
        option.shell = gitbash
        return shell.exec(cmd, option)
    }
}

module.exports = {
    ...shell,
    exec,
    execSilent
}
