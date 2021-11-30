
export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        allContractCompanyList: [],
        contractCompanyList: []
    },
    mutations: {
        update_list(state, data) {
            state.allContractCompanyList = data
            state.contractCompanyList = data.filter(item => item.is_manage)
        }
    },
    actions: {
        async getList({ state, commit }) {
            if (state.allContractCompanyList.length) {
                return
            }
            let data = await Vue.$ctx.api.get('/api/account/v4/users/companys/', {
                params: { account_type: 'hr' }
            })
            commit('update_list', data)
        },
        async updateList({ commit }) {
            let data = await Vue.$ctx.api.get('/api/account/v4/users/companys/')
            commit('update_list', data)
        }
    }
}
