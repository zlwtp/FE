
const getCatalogProps = catalog => {
    const { readdirSync, statSync } = require('fs')
    const arr = []

    readdirSync(catalog).forEach(dirname => {
        const stats = statSync(`${catalog}/${dirname}`)
        if (stats.isDirectory()) {
            readdirSync(`${catalog}/${dirname}`).forEach(sub_dirname => {
                arr.push(`${dirname}/${sub_dirname}`)
            })
        }
    })

    return arr.join(',')
}

module.exports = async({ ctx, log }) => {
    const { resolve } = require('path')
    const { readFileSync, existsSync } = require('fs')

    const execNR = require('../command/execNR')
    const sendEmail = require('../command/sendEmail')

    const ROOT = process.cwd()
    const tag = process.env.DM_INC_NPM
    const pkg = require(`${ROOT}/package.json`)
    const zipFile = 'release.zip'
    const DIR_CDN = `dist/cdn`
    const DIR_NODE = `dist/node`
    const DIR_HTML = `dist/html`
    const DIR_NGINX = `dist/nginx`
    const DIR_DOCKER = `dist/docker`

    const cdn_task = existsSync(DIR_CDN)
    const node_task = existsSync(DIR_NODE)
    const html_task = existsSync(DIR_HTML)
    const nginx_task = existsSync(DIR_NGINX)
    const docker_task = existsSync(DIR_DOCKER)

    const version = `0.0.1-${process.env.DM_INC_NPM}.${process.env.CI_COMMIT_SHA}`

    console.log(process.cwd(), "cwd")
    if (cdn_task) { // TODO: 迁移到子模块中
        log(`部署cdn`)
        await execNR(`cd ${DIR_CDN} && ls -la && zip -qr ${zipFile} * ${DIR_CDN} && cd ../../`)
        await execNR(`md5sum ${resolve(ROOT, DIR_CDN, zipFile)}`)
        await execNR(`$DM_PUBLISH -f ${resolve(ROOT, DIR_CDN, zipFile)} -t cdn -n nothing -e ${tag}`)
    }

    if (node_task) { // TODO: 废弃
        log(`部署node`)
        await execNR(`cd ${DIR_NODE} && zip -qr ${zipFile} * ${DIR_NODE} && cd ../../`)
        await execNR(`$DM_PUBLISH -f ${resolve(ROOT, DIR_NODE, zipFile)} -t node -n nothing -e ${tag} -p "${getCatalogProps(DIR_NODE)}"`)
    }

    if (html_task) { // TODO: 废弃
        log(`部署html`)
        await execNR(`cd ${DIR_HTML} && zip -qr ${zipFile} * ${DIR_HTML} && cd ../../`)
        await execNR(`$DM_PUBLISH -f ${resolve(ROOT, DIR_HTML, zipFile)} -t html -n nothing -e ${tag}`)
    }

    if (docker_task) { // TODO: 迁移到子模块中
        log(`部署docker`)
        const str = readFileSync(resolve(ROOT, DIR_DOCKER, './release.txt')).toString('utf-8')
        const updateList = str.split('\n')
        updateList.pop()
        for (const item of updateList) {
            console.log(`2haohr-fe_docker_update ${item}`)
            await execNR(`2haohr-fe_docker_update ${item}`)
        }
    }

    if (nginx_task) {
        log(`部署nginx`)
        await execNR(`cd ${DIR_NGINX} && zip -qr ${zipFile} * ${DIR_NGINX} && cd ../../`)
        await execNR(`$DM_PUBLISH -f ${resolve(ROOT, DIR_NGINX, zipFile)} -t nginx -n nothing -e ${tag}`)
    }

    log(`发布私有npm服务`)
    await execNR(`echo -e $DM_NPMRC > .npmrc`)
    await execNR(`npm dist-tag add ${pkg.name}@${version} ${tag}`)

    if (process.env.DM_SEND_EMAIL_SWITCH === 'on' && process.env.DM_INC_NPM !== "dev") {
        log(`发布版本邮件`)
        await sendEmail(ctx.gitHead)
    }
}
