export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        workPlaceList: [],
        allWorkPlaceList: []
    },
    mutations: {
        update_list(state, data) {
            state.allWorkPlaceList = data
            state.workPlaceList = data.filter(item => item.is_manage)
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.allWorkPlaceList.length) {
                return
            }
            const data = await Vue.$ctx.api.get('/api/orgs/work_place/base_list/')
            commit('update_list', data)
        },
        async updateList({ commit }) {
            const data = await Vue.$ctx.api.get('/api/orgs/work_place/base_list/')
            commit('update_list', data)
        }
    }
}
