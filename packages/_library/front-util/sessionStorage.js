
// TODO: 支持Object的存取

// 默认配置
const defaultOption = {
    affix: ''
}

class SessionStorage {
    constructor(option = {}) {
        Object.assign(this, {
            ...defaultOption,
            ...option
        })
    }
    get(key) {
        let { affix } = this
        return sessionStorage.getItem(`${key}${affix}`)
    }
    set(key, value, opt) {
        let { affix } = { ...this, ...opt }
        sessionStorage.setItem(`${key}${affix}`, value)
    }
    remove(key, opt) {
        let { affix } = { ...this, ...opt }
        sessionStorage.removeItem(`${key}${affix}`)
    }
}

export default SessionStorage
