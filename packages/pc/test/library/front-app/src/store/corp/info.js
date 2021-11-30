import Env from '@2haohr/front-env'
import { api } from '../index'
import { redirect } from './util'

export default {
    namespaced: true,
    state: {},
    mutations: {
        update(state, val) {
            for (const i in val) {
                Vue.set(state, i, val[i])
            }
        }
    },
    actions: {
        async init({ commit }) {
            const data = await api.get('/api/ucenter/companys/company_info/')
            const comPlatform = data?.platform?.toLowerCase() || ''
            const platform = comPlatform === 'saas' ? '' : comPlatform
            Env({ Vue }, { platform })
            redirect(data, comPlatform)
            commit('update', data)
        }
    },
    getters: {
        edition(state) {
            let rs = 0
            // 如果订阅字段存在，为数组，且数组长度大于0
            if (state.subscription && state.subscription instanceof Array && state.subscription.length) {
                // 如果订阅数组中存在有效的，则认为是付费版本
                const idx = state.subscription.findIndex(item => {
                    // item.is_invalid [true:免费,false:付费] sub_type [1：企业版, 2：集团版, 3:培训版, 4:启航版]
                    const isEdition = [1, 2]
                    // 考勤、薪酬的启航版、培训版归类到个人版中
                    const { pathname } = location
                    if (!/^\/payroll|attendance|social/i.test(pathname)) {
                        isEdition.push(3, 4)
                    }
                    return !item.is_invalid && isEdition.includes(item.sub_type)
                })
                if (idx > -1) {
                    // 付费版
                    rs = 1
                }
            }
            return rs
        },
        // 是否认证
        accredited(state) {
            return state.accredit_status === 3
        }
    }
}
