import Rec from '@2haohr/front-behavior-statistics/src/log/index'
import { productLine } from '@2haohr-major/front-plugin-log-behavior'

export default ({ Vue }) => {
    const { api, env, store } = Vue.$ctx

    class Log {
        constructor() {
            const rec = new Rec(env)
            this.rec = function (...args) {
                rec.log(...args)
            }
        }

        PL({ content = '', employee_id = null, link = null, link_text = null, sync = false }) {
            return api.post('/api/v1/log/employee_log/', {
                content,
                employee_id,
                link,
                link_text,
                sync
            })
        }

        UV() {
            // 企业活跃度统计
            const { company_no } = store.state.corp.info
            const { account } = store.state.user.info
            try {
                const img = new Image()
                img.src = `https://rec${
                    env === 'pd' ? '' : '-dev'
                }.2haohr.com/2haohrArchitecture/ucenter/ucenter/userOnline?comp=${company_no}&account=${account}`
            } catch (e) {}
        }

        PLV(path) {
            // 产品线统计 product line
            const company_no = store.state.corp.info.company_no || ''
            const account = store.state.user.info.account || ''
            const postPath = productLine[path]

            if (postPath) {
                try {
                    const img = new Image()
                    img.src = `https://rec${
                        env === 'pd' ? '' : '-dev'
                    }.2haohr.com${postPath}?comp=${company_no}&act=${account}`
                } catch (e) {}
            }
        }
    }

    Vue.$ctx.log = new Log()
}
