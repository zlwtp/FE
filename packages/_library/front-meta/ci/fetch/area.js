
const api = require('./api')

const processArea = (data) => {
    let rs = {
        label: data.name,
        value: data.id
    }
    if (data.list) {
        const children = data.list.map(data => processArea(data))
        if (children && children.length > 0) {
            rs.children = children
        }
    }
    return rs
}

module.exports = async() => {
    // 城市地区数据
    const response = await api.get('/v1/area/')
    return Object.values(response.data.data.objects).map(data => processArea(data))
}
