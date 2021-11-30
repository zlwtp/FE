export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobList = data
        }
    },
    actions: {
        async getList({ state, commit }) {
            if (state.jobList.length) {
                return
            }
            const data = await Vue.$ctx.api.get('/api/orgs/job_title/list/')
            commit('update_list', data)
        },
        async updateList({ commit }) {
            const data = await Vue.$ctx.api.get('/api/orgs/job_title/list/')
            commit('update_list', data)
        }
    }
}
