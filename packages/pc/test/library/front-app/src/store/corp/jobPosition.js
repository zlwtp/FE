export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobPositionList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobPositionList = data
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.jobPositionList.length) {
                return
            }
            const data = await Vue.$ctx.api.get('/api/orgs/job_position/simple_list/')
            commit('update_list', data)
        },
        // 职务
        async updateList({ commit }) {
            const data = await Vue.$ctx.api.get('/api/orgs/job_position/simple_list/')
            commit('update_list', data)
        }
    }
}
