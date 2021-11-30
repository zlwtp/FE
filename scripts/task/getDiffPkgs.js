module.exports = async ({ ctx, log }) => {
    const exec = require('../command/exec')
    const table = require('text-table')

    if (ctx.gitHead) {
        log('diff文件')
        // const changeFiles = await exec(`git diff ${ctx.gitHead} --diff-filter=ACMRTUBD --name-only --no-renames packages`)
        const changeFiles = 'packages/pc/website/view/wework-version/src/index.js'
        console.log(changeFiles)

        const diffPkgs = {}
        const pkgNames = Object.keys(ctx.allPkgs)
        pkgNames.forEach(key => {
            const pkg = ctx.allPkgs[key]
            if (changeFiles.includes(`${pkg.path}/`)) {
                // 设置模块变化
                diffPkgs[key] = pkg
            }
        })

        pkgNames.forEach(key => {
            // 如果依赖中存在改变的模块，那么模块本身也加入变化
            const pkg = ctx.allPkgs[key]
            pkg.deps.forEach(dep => {
                if (diffPkgs[dep]) {
                    diffPkgs[key] = pkg
                }
            })
        })

        log('diff包')
        console.log(table(Object.values(diffPkgs).map(pkg => [pkg.name, pkg.description])))

        ctx.diffPkgs = diffPkgs
    } else {
        ctx.diffPkgs = ctx.allPkgs
    }
}
