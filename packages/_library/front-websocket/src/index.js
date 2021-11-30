import './vendor/pushstream.min'

class _Websocket {
    constructor(option) {
        this.eventPool = {} // 事件池
        this.channels = [] // channel频道
        // 建立socket连接实例
        this.pushstream = new PushStream({
            host: 'push.2haohr.com',
            port: window.location.protocol === 'https:' ? 9090 : 9080,
            modes: window.WebSocket ? 'websocket' : 'longpolling',
            useSSL: window.location.protocol === 'https:',
            ...option
        })
        // 推送事件回调
        this.pushstream.onmessage = text => {
            const { data, action } = this.decode(text) // 解码消息
            console.log(`收到推送消息: ${JSON.stringify(data)}`)
            // 有匹配则批量执行callback
            if (this.eventPool[action]) {
                for (const callback of this.eventPool[action]) {
                    typeof callback === 'function' && callback(data)
                }
            }
        }
    }

    async start(channels) { // 启动socket
        this.channels = Array.from([].concat(channels))
        this.channels.forEach(channel => {
            this.pushstream.addChannel(channel)
        })
        this.pushstream.connect()
        console.log(this.pushstream)
    }

    async stop() { // 关闭socket
        if (this.pushstream) {
            this.channels.forEach(channel => {
                this.pushstream.removeChannel(channel)
            })
            this.pushstream.disconnect()
        }
    }

    addEvent(eventName, callback) { // 添加socket事件回调
        this.eventPool[eventName] = this.eventPool[eventName] || []
        this.eventPool[eventName].push(callback)

        return () => {
            this.removeEvent(eventName, callback)
        }
    }

    removeEvent(eventName, callback) { // 移除socket事件回调
        const events = this.eventPool[eventName] || []
        events.splice(events.indexOf(callback), 1)
    }

    static install({ Vue }, option) {
        Vue.$ctx.websocket = new _Websocket(option)
    }

    decode(text) { // 通过解码返回数据和行为
        const data = JSON.parse(atob(text))
        return {
            data,
            action: data.action || 'default'
        }
    }
}

export default _Websocket
