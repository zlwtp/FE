
import './vendor/idle-timer'
import protect from './protect'
import $ from 'jquery'

export default ({ Vue }) => {
    const {
        store,
        util: { localStorage }
    } = Vue.$ctx
    const { screen = {} } = store.state.user.config

    class Screen {
        constructor() {
            this.SCREEN_KEY = 'screenProtect'
            Object.assign(this, this.getConfig(screen))
            this.protect()
        }
        getConfig(config) {
            return {
                enable: true,
                interval: 5 * 60 * 1000,
                imageIndex: 0,
                ...config,
                imageList: [
                    'https://pub-cdn.2haohr.com/share/imgs/2017/4.jpg',
                    'https://pub-cdn.2haohr.com/share/imgs/2017/3.jpg',
                    'https://pub-cdn.2haohr.com/share/imgs/2017/5.jpg'
                ]
            }
        }
        // 保存屏保配置
        save(option) {
            const config = this.getConfig(option)
            Object.assign(this, config)
            store.dispatch('user/config/update', {
                key: 'screen',
                value: config
            })
            this.protect()
        }
        // 开启屏保
        protect() {
            if (this.enable) {
                // 重置idleTimer
                $.idleTimer('destroy')
                // 设置屏保时间
                $.idleTimer({
                    timeout: this.interval
                })
                // timeout无动作时触发屏保程序
                $(document).on('idle.idleTimer', (event, elem, obj) => {
                    // 显示屏保
                    protect.show(this.imageList[this.imageIndex])
                })
                // 屏保解锁事件窗口监听
                localStorage.addEvent(this.SCREEN_KEY, async() => {
                    // 隐藏屏保
                    protect.hide()
                    // 重置计时
                    $(document).idleTimer('reset')
                })
            } else {
                // 隐藏屏保
                protect.hide()
                // 销毁屏保计时
                $.idleTimer('destroy')
            }
        }
        // 解锁
        unlock() {
            // 隐藏屏保
            protect.hide()
            // 重置计时
            $(document).idleTimer('reset')
            // 触发其他窗口解锁事件
            localStorage.handle(this.SCREEN_KEY)
        }
    }

    Vue.$ctx.screen = new Screen()
}
