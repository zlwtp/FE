export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        deptList: [],
        allDeptList: [],
        newSimpleList: []
    },
    mutations: {
        update_list(state, data) {
            const forUserList = data.filter(item => item.is_in_user_management)
            state.deptList = forUserList
            state.allDeptList = data
        },
        updateNewList(state, data) {
            state.newSimpleList = data
        }
    },
    actions: {
        async getList({ state, commit, dispatch, rootState }, code) {
            dispatch('getNewSimpleList', code)
            if (state.allDeptList.length) {
                return
            }
            const perm_code = code !== undefined ? code : rootState.corp.info.perm_code
            const data = await Vue.$ctx.api.get('/api/orgs/department/list/', {
                params: {
                    perm_code
                }
            })
            commit('update_list', data)
        },
        async updateList({ commit, dispatch, rootState }, code) {
            const perm_code = code !== undefined ? code : rootState.corp.info.perm_code
            const data = await Vue.$ctx.api.get('/api/orgs/department/list/', {
                params: {
                    perm_code
                }
            })
            dispatch('getNewSimpleList', code)
            commit('update_list', data)
        },
        async getNewSimpleList({ commit, rootState }, code) {
            const perm_code = code !== undefined ? code : rootState.corp.info.perm_code
            const data = await Vue.$ctx.api.get('/api/orgs/department/list/select_search/', {
                params: {
                    perm_code
                }
            })
            commit('updateNewList', data)
        }
    }
}
