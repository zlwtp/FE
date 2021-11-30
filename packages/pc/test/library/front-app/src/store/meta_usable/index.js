export default {
    namespaced: true,
    state: {},
    mutations: {
        update(state, data) {
            for (let i in data) {
                let rs = []
                if (i === 'leave_reason') {
                    rs = data[i].filter(group => {
                        group.list = group.leave_reasons.filter(item => item.is_enable)
                        return group.is_enable && group.list.length
                    })
                } else if (i === 'unusual_change_reason') {
                    rs = data[i].filter(group => {
                        group.list = group.change_reasons.filter(item => item.is_enable)
                        return group.list.length
                    })
                } else {
                    rs = data[i].filter(item => item.is_used)
                }
                Vue.set(state, i, rs)
            }
        }
    }
}
