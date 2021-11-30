
import Api from '@2haohr/front-api'
import { platform } from '../env'

export default (app, option) => {
    Api.install(app, option)

    const {
        api
    } = Vue.$ctx

    // 标识飞书/微信版本
    if ([
        'feishu',
        'wework'
    ].includes(platform)) {
        api.option.headers['X-PLATFORM'] = platform
    }

    // 取消请求

    // api成功的处理
    api.option.responseSuccess = ({ config, data }) => {
        if (config.url.startsWith('/api') || config.url.startsWith('/yapi')) {
            if (data.resultcode === 200) {
                return Promise.resolve(data.data)
            }
            console.log(`%cERROR: ${config.method} ${config.url}`, 'color: #f00;')
            const errToast = config.errToast === undefined || config.errToast
            errToast && Vue.$message.error(data.errormsg)
            return Promise.reject(data)
        }
        return Promise.resolve(data)
    }
    // api出错时的处理
    api.option.responseError = ret => {
        const { config, response } = ret
        const errToast = config.errToast === undefined || config.errToast

        let errMsg = response.data
        let errData = {
            errormsg: response.statusText,
            code: response.status
        }
        if (typeof errMsg === 'object') {
            errMsg = response.data
            errData = {
                errormsg: errMsg.error,
                code: errMsg.resultcode,
                data: errMsg.data
            }
        }
        errToast && Vue.$message.error(errData.errormsg)
        return Promise.reject(errData)
    }
}
