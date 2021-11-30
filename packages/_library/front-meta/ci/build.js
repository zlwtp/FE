
const { outputFile } = require('fs-extra')
const getArea = require('./fetch/area')
const getDictionary = require('./fetch/dictionary');
(async() => {
    // 2019.9.26 #55129 更新企业规模枚举
    // 2019.9.26 #55129 更新企业规模枚举 第二次，顺序调整
    // 2019.10.30 #57368 更新企业规模枚举 第三次，配合后端城市名称更改
    // 2020.5.6 #69629 行业类型支持多级 再次发布
    // 2020.5.29 #72900 后端之前返的枚举值前后都加了空格，这个版本解决了，重新获取枚举值
    // 从服务端获取数据
    // TODO: 此处依赖的接口挂了会导致失败，是否考虑try catch或者其他的方案
    // 2021.1.21 #101431 更新地址库/v1/area/
    // 2021.7.20 #119074 更新人员规模枚举文本(触发重新编译)
    // 2021.11.2 #124958 更新行业分类
    const { industry, company_scale, invoice_type } = await getDictionary()
    const area = await getArea()

    const allData = {
        area,
        industry,
        company_scale,
        invoice_type
    }

    // 单个文件
    Object.keys(allData).forEach(key => {
        outputFile(`./dist/${key}.js`, `module.exports = ${JSON.stringify(allData[key], null, 2)}`)
    })

    // 包含所有文件
    outputFile('./dist/index.js', `module.exports = {${
        Object.keys(allData).map(key => `'${key}': require('./${key}.js'),`)
            .join('\n')
    }}`)
})()
