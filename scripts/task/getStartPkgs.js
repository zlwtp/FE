
module.exports = port => async({ ctx, log }) => {
    const inquirer = require('inquirer')

    // 可以启动的项目列表
    const choices = Object.values(ctx.allPkgs)
        .filter(item => item.dm.devServer)
        .map(item => ({
            index: parseInt(item.dm.index),
            name: `[${item.dm.index || ''}] ${item.description}`,
            value: item.name
        }))
        .sort((a, b) => a.index - b.index)

    // 根据type获取repo
    const repo = choices.find(item => `${item.index}` === `${port}`)

    let name = repo && repo.value
    if (!name) {
        // 提示选择项目
        const rs = await inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: '选择你要启动的项目，回车（快捷启动 yarn start [左侧对应的数字])',
                pageSize: 9999,
                choices
            }
        ])
        name = rs.name
    }

    ctx.diffPkgs = { [name]: ctx.allPkgs[name] }
}
