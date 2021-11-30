
import '@2haohr/front-reset-css'

import { clickoutside, transferDom } from '@2haohr/dmui-directives'
import affix from '@2haohr/dmui-affix'
import alert from '@2haohr/dmui-alert'
import autocomplete from '@2haohr/dmui-autocomplete'
import avatar from '@2haohr/dmui-avatar'
import backTop from '@2haohr/dmui-back-top'
import badge from '@2haohr/dmui-badge'
import card from '@2haohr/dmui-card'
import cascader from '@2haohr/dmui-cascader'
import circle from '@2haohr/dmui-circle'
import divider from '@2haohr/dmui-divider'
import drag from '@2haohr/dmui-drag'
import drawer from '@2haohr/dmui-drawer'
import dswitch from '@2haohr/dmui-switch'
import icon from '@2haohr/dmui-icon'
import input from '@2haohr/dmui-input'
import inputNumber from '@2haohr/dmui-input-number'
import message from '@2haohr/dmui-message'
import { modal, modalInstance } from '@2haohr/dmui-modal'
import nodata from '@2haohr/dmui-no-data'
import notice from '@2haohr/dmui-notice'
import pagination from '@2haohr/dmui-pagination'
import progress from '@2haohr/dmui-progress'
import split from '@2haohr/dmui-split'
import { table, tableColumn } from '@2haohr/dmui-table'
import tag from '@2haohr/dmui-tag'
import tree from '@2haohr/dmui-tree'
import { timeSelect, timePicker, datePicker } from '@2haohr/dmui-date-picker'
import { row, col } from '@2haohr/dmui-grid'
import { breadcrumb, breadcrumbItem } from '@2haohr/dmui-breadcrumb'
import { collapse, panel } from '@2haohr/dmui-collapse'
import { timeline, timelineItem, timelineExpand } from '@2haohr/dmui-timeline'
import { steps, step } from '@2haohr/dmui-steps'
import { form, formItem } from '@2haohr/dmui-form'
import { select, option, optionGroup } from '@2haohr/dmui-select'
import { button, buttonGroup } from '@2haohr/dmui-button'
import { radio, radioGroup, radioButton } from '@2haohr/dmui-radio'
import { checkbox, checkboxGroup, checkboxButton } from '@2haohr/dmui-checkbox'
import { dropdown, dropdownMenu, dropdownItem } from '@2haohr/dmui-dropdown'
import { directive as tooltipDirective, tooltipContent } from '@2haohr/dmui-tooltip'
import { directive as poptipDirective, poptip } from '@2haohr/dmui-poptip'
import { directive as loadingDirective, loading, loadingCom } from '@2haohr/dmui-loading'
import { tabs, tabPane } from '@2haohr/dmui-tabs'
import { carousel, carouselItem } from '@2haohr/dmui-carousel'
import { upload, Uploader } from '@2haohr/dmui-upload'
import slider from '@2haohr/dmui-slider'
import transition from '@2haohr/dmui-transition'
import cropper from '@2haohr/dmui-cropper'
import parser from '@2haohr/dmui-parser'
import qrcode from '@2haohr/dmui-qrcode'
import rate from '@2haohr/dmui-rate'

import vuedraggable from 'vuedraggable'
import area from '@2haohr-major/com-area'
// import bottomPopup from '@2haohr-major/com-bottom-popup'
import {
    bottomPopupWrap,
    bottomPopup,
    batchDelete,
    num
} from '@2haohr-major/com-bottom-popup'
import caption from '@2haohr-major/com-caption'
import exportProgress from '@2haohr-major/com-export-progress'
import dataTable from '@2haohr-major/com-data-table'
import smartTableColumn from '@2haohr-major/com-smart-table-column'
import datePicker1 from '@2haohr-major/com-date-picker'
import guideTip from '@2haohr-major/com-guide-tip'
import qiniuUpload from '@2haohr-major/com-qiniu-upload'
import attachmentGallery from '@2haohr-major/com-attachment-gallery'
import layoutWrapper from '@2haohr-major/com-layout-wrapper'
import awsomePicker from '@2haohr-major/com-awsome-picker'
import vayneTabs from '@2haohr/vayne-tabs'
import dataGrid from '@2haohr-major/com-data-grid'

import elementControl from '@2haohr/front-element-control'

export default ({ Vue }) => {
    const webui = {
        affix,
        alert,
        autocomplete,
        avatar,
        backTop,
        badge,
        breadcrumb,
        breadcrumbItem,
        button,
        buttonGroup,
        card,
        cascader,
        checkbox,
        checkboxButton,
        checkboxGroup,
        circle,
        col,
        collapse,
        datePicker,
        divider,
        drag,
        drawer,
        dropdown,
        dropdownItem,
        dropdownMenu,
        dswitch,
        form,
        formItem,
        icon,
        input,
        inputNumber,
        modal,
        nodata,
        option,
        optionGroup,
        pagination,
        panel,
        poptip,
        progress,
        radio,
        radioButton,
        radioGroup,
        row,
        select,
        split,
        step,
        steps,
        table,
        tableColumn,
        tabPane,
        tabs,
        tag,
        timeline,
        timelineExpand,
        timelineItem,
        timePicker,
        timeSelect,
        tooltipContent,
        tree,
        carousel,
        carouselItem,
        upload,
        slider,
        loadingCom,
        transition,
        cropper,
        parser,
        qrcode,
        rate,
        dataGrid
    }

    Vue.directive('tooltip', tooltipDirective)
    Vue.directive('poptip', poptipDirective)
    Vue.directive('loading', loadingDirective)
    Vue.directive('clickoutside', clickoutside)
    Vue.directive('transfer-dom', transferDom)
    Vue.directive('ec', elementControl)

    Vue.$message = Vue.prototype.$message = message
    Vue.$notice = Vue.prototype.$notice = notice
    Vue.$loading = Vue.prototype.$loading = loading
    Vue.$modal = Vue.prototype.$modal = modalInstance
    Vue.$Uploader = Vue.prototype.$Uploader = Uploader

    // 加载组件库
    Object.keys(webui).forEach(key => {
        Vue.component(webui[key].name, webui[key])
    })

    Vue.use(exportProgress)
    Vue.component('Vuedraggable', vuedraggable)
    Vue.component('BArea', area)
    Vue.component('BBottomPopup', bottomPopup)
    Vue.component('BBatchDelete', batchDelete)
    Vue.component('BBottomPopupWrap', bottomPopupWrap)
    Vue.component('BNum', num)
    Vue.component('BCaption', caption)
    Vue.component('BDataTable', dataTable)
    Vue.component('BSmartTableColumn', smartTableColumn)
    Vue.component('BDatePicker1', datePicker1)
    Vue.component('BGuideTip', guideTip)
    Vue.component('BQiniuUpload', qiniuUpload)
    Vue.component('BAttachmentGallery', attachmentGallery)
    Vue.component('BLayoutWrapper', layoutWrapper)
    Vue.component('BAwsomePicker', awsomePicker)
    Vue.component('BVayneTabs', vayneTabs)
}
