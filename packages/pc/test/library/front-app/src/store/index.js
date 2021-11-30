
import Store from '@2haohr/front-store'
import interceptor from './interceptor'
import user from './user'
import corp from './corp'
// import meta from './meta'
// import meta_usable from './meta_usable'
import topbar from './topbar'

export let api

export default (app, option) => {
    Store(app, option)
    const Vue = app.Vue
    const { store } = Vue.$ctx
    api = Vue.$ctx.api.createInstance(interceptor)
    store.registerModule('user', user)
    store.registerModule('corp', corp)
    // store.registerModule('meta', meta)
    // store.registerModule('meta_usable', meta_usable)
    store.registerModule('topbar', topbar)
}
