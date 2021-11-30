
const processArea = (data = [], parent = '') => {
    const arr = Object.values(data) // 确保一定是数组
    return arr.reduce((prev, item) => ({
        ...prev,
        [item.value]: {
            text: item.label,
            parent
        },
        ...processArea(item.children, item.value)
    }), {})
}

export default ({ Vue }) => {
    const {
        platform,
        util: {
            numToChinese,
            numToThousands,
            formatDate,
            dateDiff,
            lodash: {
                round
            }
        },
        store
    } = Vue.$ctx

    const areaData = processArea(store.state.meta.area)

    class Filter {
        // 阿拉伯数字转汉字 toChinese|numberCh => numToChinese
        numToChinese(val) {
            return numToChinese(val)
        }

        // 金额转换为千分位格式 moneyToThousand => numToThousands
        numToThousands(val, n = 2) {
            return numToThousands(val, n) || val
        }

        // 数字0转换为mask
        zero2mask(val, mask = '--') {
            if (val === null || val === undefined || val === '') {
                return val
            }
            if (val === 0) { return mask }
            const n = val.toString().replace(/%$/, '')
            if (isNaN(n)) {
                return val
            }
            if (parseFloat(n) === 0) { return mask }
            return val
        }

        // 四舍五入，保留N位小数 decimalPlacesFilter => round
        round(val, n = 2) {
            const v = round(val, n)
            return isNaN(v) ? val : v
        }

        // 百分比 percentFilter => percent
        percent(val, n = 2) {
            if (isNaN(val)) {
                return val
            }
            n = n >= 0 && n <= 20 ? n : 2
            return `${(Math.round(val * Math.pow(10, 2 + n)) / Math.pow(10, n)).toFixed(n)}%`
        }

        // 格式化日期
        date(val, format = 'YYYY-MM-DD') {
            return formatDate(val, format) || val
        }

        // 格式化时间差，当前时间为基准
        dateDiff(val) {
            if (!val) {
                return val
            }
            return dateDiff(val) || val
        }

        // 手机号掩码 mobileEncrypt => mobileMask
        mobileMask(val) {
            if (!val) {
                return val
            }
            return String(val).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        }

        // 取字符串最后2个字符 twoWordFilter => lastTwoChars
        lastTwoChars(val) {
            if (!val) {
                return val
            }
            val = String(val)
            return val.length > 2 ? val.substr(val.length - 2) : val
        }

        // 默认头像
        defaultAvatar(val) {
            let imgurl = require('./avatar-default.png')
            console.log(platform)
            if (platform) {
                imgurl = require('./avatar.png')
            }
            return val || imgurl
        }

        // 根据id获取省市区结构
        area(val, single = false) {
            const type = typeof val

            if (type === 'string' || type === 'number') { // 匹配的
                if (single) { // 匹配单个id
                    return areaData[val] ? areaData[val].text : '暂无'
                }
                return (function rec(val) {
                    const data = areaData[val]
                    if (!data) {
                        return '暂无'
                    }
                    if (data.parent) {
                        return `${rec(data.parent)}/${data.text}`
                    }
                    return data.text
                })(val)
            }
            return val.map(item => (areaData[item] ? areaData[item].text : '')).filter(item => item)
                .join('/')
        }
    }

    Vue.$ctx.filter = new Filter()
}
