const iteratorTitleGroup = function (data, parentItem = {}) {
    return data.reduce((arr, item) => {
        const {
            id,
            company_id,
            title,
            level,
            desc,
            children = [],
            kind_id
        } = item
        let indent = ''
        for (let i = 0; i < level; i++) {
            if (i > 0) {
                indent += '　'
            }
        }
        const indent_title = indent + title
        return arr.concat(
            [
                {
                    id,
                    company_id,
                    title,
                    level,
                    desc,
                    indent_title,
                    kind_id,
                    sup_job_title_group_id: parentItem
                        ? parentItem.id || ''
                        : '',
                    sup_job_title_group_title: parentItem
                        ? parentItem.title || ''
                        : ''
                }
            ],
            iteratorTitleGroup(children, item)
        )
    }, [])
}
export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobTitleGroupList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobTitleGroupList = iteratorTitleGroup(data)
        }
    },
    actions: {
        async getList({ state, commit }) {
            if (state.jobTitleGroupList.length) {
                return
            }
            const data = await Vue.$ctx.api.get(
                '/api/orgs/job_title_group/tree/?is_include_stat=1'
            )
            commit('update_list', data)
        },
        async updateList({ commit }) {
            const data = await Vue.$ctx.api.get(
                '/api/orgs/job_title_group/tree/?is_include_stat=1'
            )
            commit('update_list', data)
        }
    }
}
