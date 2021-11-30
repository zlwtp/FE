import Util from '@2haohr/front-util'
import { affix, domain } from '../env'

export default (app, option) => {
    Util.install(app, { affix, domain })

    const { util } = app.Vue.$ctx

    util.downloadDoc = async template_no => {
        const { api, util } = app.Vue.$ctx
        const { download_link } = await api.get('/api/op/api/template_file/', {
            params: {
                template_no
            }
        })
        util.downloadFile(download_link)
    }

    // 免登录打开员工端
    util.openStaffPlatform = (
        urlOption = {
            path: '/desk',
            params: {}
        },
        openWindow = true,
        callback
    ) => {
        const { params, path } = urlOption
        const hasStaff = Vue.$ctx.store.state.user.info.is_employee
        const { share_id } = Vue.$ctx.store.state.corp.info
        const { qs } = Vue.$ctx.util
        let url = `${Vue.$ctx.staff_url}${path}?${qs.stringify({ ...params })}`
        if (!hasStaff) {
            if (window.platform === 'feishu' || window.platform === 'wework') {
                url = `${Vue.$ctx.staff_url}`
            } else {
                url = `${Vue.$ctx.staff_url}/oauth/${share_id}/join?callback=${encodeURIComponent(url)}`
            }
        }

        if (callback) {
            callback(url, hasStaff)
            return
        }

        if (!openWindow) {
            window.location.href = url
            return
        }
        Vue.$ctx.hyperlink.open(url)
    }
}
