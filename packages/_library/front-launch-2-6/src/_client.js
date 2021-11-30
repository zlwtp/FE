/**
 * 客户端socket，用于接收编译通知后自动刷新页面
 */

/* global __resourceQuery */
/* eslint prefer-destructuring: off */
const socketIOClient = require('socket.io-client')
const url = require('url')

const { location } = window
const { origin, query } = url.parse(__resourceQuery.substr(1)) // eslint-disable-line
const io = socketIOClient(origin)
const channel = query.replace('channel=', '')

let hotCurrentHash // lastHash 上一次 hash值
let currentHash // 这一次的hash值
const check = () => {
    if (!module.hot) return
    if (module.hot.status() !== 'idle') return
    module.hot
        .check(true)
        .then(updatedModules => {
            if (updatedModules) {
                localStorage.setItem('reloaded', false)
                return false
            }
            // 因为当重新启动时，如果之前启动多个 webpack 实例，会多次触发页面刷新，所以这里做下缓存
            if (localStorage.getItem('reloaded') !== 'true') {
                location.reload()
                localStorage.setItem('reloaded', true)
            }
        })
        .catch(() => {
            location.reload()
        })
}
const hotUpdate = () => {
    if (!hotCurrentHash || hotCurrentHash !== currentHash) {
        hotCurrentHash = currentHash
        check()
    }
}

io.on('error', error => {
    console.warn(error)
})

io.on('connect success', () => {
    console.log('连接热刷新服务器成功！')
})

io.on(`hash${channel}`, hash => {
    console.log('hash change', hash)
    currentHash = hash
})

io.on(`compiling${channel}`, () => {
    console.log('编译中，霍杯茶吧~')
})
io.on(`refresh${channel}`, hot => {
    console.log(`要开始刷新了${hot ? ',【当前为 hmr 模式】' : ''}`)

    if (hot) {
        hotUpdate()
    } else {
        location.reload()
    }
})
