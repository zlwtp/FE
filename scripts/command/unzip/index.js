/**
 * 解压缩
 */

 module.exports = async(zipfile, dest = './') => {
    if (zipfile) {
        const { resolve } = require('path')
        const { ensureDirSync } = require('fs-extra')
        const execNR = require('../execNR')

        // 创建解压目录
        ensureDirSync(dest)
        // 解压
        if (process.platform === 'win32') {
            const zipExe = resolve(__dirname, './7za.exe')
            await execNR(`${zipExe} x ${zipfile} -o"${dest}" -y`)
        } else {
            await execNR(`unzip -o -q ${zipfile} -d ${dest}`)
        }
    }
}
