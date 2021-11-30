
import com from './com.vue'

let dom

export default {
    show(img) {
        if (!dom) {
            const Screen = Vue.extend(com)
            dom = new Screen().$mount()
            document.body.appendChild(dom.$el)
        }
        dom.show(img)
    },
    hide() {
        dom && dom.hide()
    }
}
