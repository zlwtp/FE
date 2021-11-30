
import generateColors from './generateColors'
import colorMap from './colorMap'

export default ({ Vue }) => {
    const { store, util: { localStorage }, platform } = Vue.$ctx
    const { skin = {} } = store.state.user.config
    const SKIN_KEY = 'skinProtect'

    class Skin {
        constructor() {
            this.colorName = skin.colorName || ([
                'feishu',
                'wework'
            ].includes(platform) ? platform : 'green')
            this.colorList = Object.keys(colorMap).map(name => ({
                name,
                color: colorMap[name].primary
            }))
                .filter(item => {
                    if (platform === 'wework') {
                        return !['feishu'].includes(item.name)
                    } else if (platform === 'feishu') {
                        return !['wework'].includes(item.name)
                    }
                    return ![
                        'feishu',
                        'wework'
                    ].includes(item.name)
                })
            this.currentColors = generateColors(colorMap[this.colorName])
            window.getSkinStyle = this.getSkinStyle.bind(this)
            // 皮肤切换事件窗口监听
            localStorage.addEvent(SKIN_KEY, async() => {
                location.reload(true)
            })
        }

        getSkinStyle(css) {
            const stylePrefix = '_color_'// 皮肤模版正则匹配前缀
            // 原始样式都是green，将green相关皮肤颜色替换为变量值
            const greenColorList = {
                '#0bb27a': 'primary',
                '#59c993': 'select',
                '#b4e7d4': 'light',
                '#0aa974': 'shade-1',
                '#0aa06e': 'shade-2',
                'rgba\\(11\\,178\\,122\\,\\.2\\)': 'alpha-1',
                'rgba\\(11\\,178\\,122\\,\\.9\\)': 'alpha-2',
                '#23ba87': 'tint-1',
                '#3cc195': 'tint-2',
                '#54c9a2': 'tint-3',
                '#6dd1af': 'tint-4',
                '#85d9bd': 'tint-5',
                '#9de0ca': 'tint-6',
                '#b6e8d7': 'tint-7',
                '#cef0e4': 'tint-8',
                '#e7f7f2': 'tint-9'
            }
            Object.keys(greenColorList).forEach(key => {
                const value = greenColorList[key]
                css = css.replace(new RegExp(key, 'ig'), stylePrefix + value)
            })

            // 将变量替换为皮肤色
            Object.keys(this.currentColors).forEach(key => {
                css = css.replace(new RegExp(`(:|\\s+)${stylePrefix}${key}`, 'g'), `$1${this.currentColors[key]}`)
                // 新主题色方案
                document.documentElement.style.setProperty(`--${key}`, this.currentColors[key])
            })
            return css
        }

        use(colorName) {
            store.dispatch('user/config/update', {
                key: 'skin',
                value: {
                    colorName
                }
            })
            localStorage.handle(SKIN_KEY)
            location.reload(true)
        }
    }

    Vue.$ctx.skin = new Skin()
}
