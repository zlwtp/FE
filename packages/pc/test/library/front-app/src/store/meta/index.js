import meta from '@2haohr/front-meta'

export default {
    namespaced: true,
    state() {
        return {
            ...meta
        }
    },
    mutations: {
        update(state, val) {
            for (let i in val) {
                Vue.set(state, i, val[i])
            }
        }
    },
    actions: {
        async updateRemote({ commit }) {
            const data = await Vue.$ctx.api.get('/api/company_setting/emp_enum_info/')
            // meta的过滤器
            Vue.filter('metaFilter', (val, field) => {
                if (!field) return val
                if (!data[field]) return val

                let t
                let obj = {}
                data[field].map(item => {
                    obj[item.value] = item.text
                })
                t = {
                    ...obj
                }[val]
                return t === undefined ? val : t
            })
            commit('meta_usable/update', data, { root: true }) // 过滤数据字典
            commit('update', data) // 远程数据字典
        },
        // 每个模块获取meta的方法
        async initRemote({ state, dispatch }) {
            // 防止重复调用  ws推送请用dispatch('updateRemote')方法
            if (!state.work_type) {
                await dispatch('updateRemote')
            }
        }
    }
}
