
import VueRouter from 'vue-router'
import App from './App.vue'

export default ({ Vue, VueOption }, option) => {
    Vue.use(VueRouter)

    const router = new VueRouter({
        mode: 'history',
        base: `/`,
        linkActiveClass: 'active',
        routes: [],
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    selector: to.hash
                }
            } else {
                return { x: 0, y: 0 }
            }
        },
        ...option
    })

    Vue.$ctx.router = router

    VueOption.router = router
    VueOption.template = '<App/>'
    VueOption.components = { App }
}
