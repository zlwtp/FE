
const api = require('./api')

module.exports = async() => {
    // 城市地区数据
    const response = await api.get('/v1/dictionary/')

    // 处理dictionary结构
    const dictionary = {}
    const walk = arr => {
        const rs = []
        arr.forEach(item => {
            const meta = {
                text: item.name,
                value: item.id
            }
            if (item.children && item.children.length) {
                meta.children = walk(item.children)
            }
            rs.push(meta)
        })
        return rs
    }
    for (const item of response.data.data) {
        dictionary[item.type] = walk(item.list)
    }

    return {
        company_scale: dictionary.company_scale,
        industry: dictionary.industry,
        invoice_type: [{ text: '普通发票', value: 1 }]
    }
}
