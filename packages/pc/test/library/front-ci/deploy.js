const pack = require('@2haohr/pack-cdn')
const { exec } = require('@2haohr/shell')
const { name } = require(`${process.cwd()}/package.json`)

// 部署静态资源到cdn
pack()

let num = 0
const setKey = async sl => {
    const result = exec(sl)
    if (result.code === 0) {
        return true
    }
    num++
    if (num >= 3) {
        return false
    }
    console.log(`${name}: 第${num + 1}次重试`)
    return setKey(sl)
}
// 写版本号到后端，用于版本更新提示

// eslint-disable-next-line no-new
new Promise(async (resolve, reject) => {
    const api_url = {
        dev: 'https://api-dev.2haohr.com',
        test: 'https://api-test.2haohr.com',
        pd: 'https://api.2haohr.com'
    }[process.env.DM_INC_NPM]

    const fs = require('fs')
    let version = process.env.DM_VERSION
    if (fs.existsSync('dist/version.js')) {
        version = require(`${process.cwd()}/dist/version.js`)
    }
    const sl = `curl -X POST -F SECRET_KEY=mposdfjrijrji23j423ujidsf -F key=${
        name.split('/')[1]
    } -F remark=版本号 -F value=${version} ${api_url}/core/config/set_key/`
    console.log(`${name} set_key 脚本: ${sl}`)
    const result = await setKey(sl)

    if (!result) {
        const axios = require('axios')
        const jobid = process.env.CI_JOB_ID
        const envName = `${process.env.DM_INC_NPM}`.toUpperCase()
        const content = [
            `[CI任务${jobid}](http://gitlab-test.dianmi365.com/dianmi-fe/2haohr/-/jobs/${jobid}) ${envName}环境 ${
                name.split('/')[1]
            } 更新key失败，请关注`
        ].join('\n')
        await axios.post(process.env.DM_SEND_WECHAT_WEBHOOK, {
            msgtype: 'markdown',
            markdown: { content }
        })
        reject()
    }
    resolve()
})
