
// 默认配置
const defaultOption = {
    domain: location.hostname,
    affix: '',
    path: '/',
    exp_day: 29
}

// 获取过期时间
const expiresTime = (day) => {
    var exp = new Date()
    exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000)
    return exp.toUTCString()
}

class Cookie {
    constructor(option = {}) {
        Object.assign(this, {
            ...defaultOption,
            ...option
        })
    }
    get(key) {
        let cookies = document.cookie.split('; ')
        for (let cookie of cookies) {
            let index = cookie.indexOf('=')
            let name = decodeURIComponent(cookie.substr(0, index))
            if (name === `${key}${this.affix}`) {
                return decodeURIComponent(cookie.substr(index + 1))
            }
        }
    }
    set(key, value, opt) {
        let {
            affix,
            domain,
            path,
            exp_day
        } = {
            ...this,
            ...opt
        }
        let str = `${key}${affix}=${encodeURIComponent(value)};path=${path};expires=${expiresTime(exp_day)};`
        if (domain !== 'localhost') {
            str += `domain=${domain};`
        }
        document.cookie = str
    }
    remove(key, opt) {
        let {
            affix,
            domain,
            path
        } = {
            ...this,
            ...opt
        }
        let str = `${key}${affix}=0;expires=${new Date(0).toUTCString()};path=${path};domain=${domain};`
        document.cookie = str
    }
}

export default Cookie
