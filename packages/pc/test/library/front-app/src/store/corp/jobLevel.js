const { api } = Vue.$ctx

export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobLevelList: [],
        jobLevelListOld: [],
        jobMapTitle: {}
    },
    mutations: {
        update_list(state, data) {
            state.jobLevelList = data
        },
        update_list_old(state, data) {
            state.jobLevelListOld = data
        },
        updateJobMapTitle(state, data) {
            state.jobMapTitle = data
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.jobLevelList.length) {
                return
            }
            const data = await api.get('/api/orgs/job_level/tree/')
            const data_old = await api.get('/api/orgs/job_level/base_list/')
            const res = await api.get('/api/orgs/job_level/title_list/')
            commit('update_list', data)
            commit('update_list_old', data_old)
            commit('updateJobMapTitle', res)
        },
        async updateList({ commit }) {
            const data = await api.get('/api/orgs/job_level/tree/')
            const data_old = await api.get('/api/orgs/job_level/base_list/')
            const res = await api.get('/api/orgs/job_level/title_list/')
            commit('update_list', data)
            commit('update_list_old', data_old)
            commit('updateJobMapTitle', res)
        }
    }
}
