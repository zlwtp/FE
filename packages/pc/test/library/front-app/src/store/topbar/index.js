export default {
    namespaced: true,
    state: {
    },
    getters: {
        height() {
            const {store} = Vue.$ctx
            return store.state.layout ? store.getters['layout/height'] : 60
        }
    }
}
