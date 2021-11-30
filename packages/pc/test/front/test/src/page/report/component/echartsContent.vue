<template>
    <div :class="s.content">
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.work_type" title="在职员工性质分布" :options="statistics.work_type" ref="echart1" echart-type="pie" >
                <div slot="table">
                    <table-list name="员工性质" :data="tableList.work_type"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.work_age" title="在职员工司龄分布" :options="statistics.work_age" ref="echart2" echart-type="pie" >
                <div slot="table">
                    <table-list name="员工司龄" :data="tableList.work_age"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.service_age" title="在职员工工龄分布" :options="statistics.service_age" ref="echart3" echart-type="pie" >
                <div slot="table">
                    <table-list name="员工工龄" :data="tableList.service_age"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.sex" title="在职员工性别分布" :options="statistics.gender" ref="echart4" echart-type="pie" >
                <div slot="table">
                    <table-list name="员工性别" :data="tableList.gender"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.education" title="在职员工学历分布" :options="statistics.education" ref="echart5" echart-type="pie" >
                <div slot="table">
                    <table-list name="员工学历" :data="tableList.education"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.age" title="在职员工年龄分布" :options="statistics.age_group" ref="echart6" echart-type="pie">
                <div slot="table">
                    <table-list name="员工年龄" :data="tableList.age_group"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.birthday" title="在职员工年代分布" :options="statistics.age"  ref="echart7" echart-type="pie" >
                <div slot="table">
                    <table-list name="员工年代" :data="tableList.age"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.marriage" title="在职员工已婚情况分布" :options="statistics.isMarried" ref="echart8" echart-type="pie" >
                <div slot="table">
                    <table-list name="已婚情况" :data="tableList.isMarried"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.birth_children" title="在职员工已育情况分布" :options="statistics.hasChildren" ref="echart9" echart-type="pie" >
                <div slot="table">
                    <table-list name="已育情况" :data="tableList.hasChildren"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.zodiac" title="在职员工生肖分布" :options="statistics.zodiac"  ref="echart10" echart-type="pie" >
                <div slot="table">
                    <table-list name="生肖" :data="tableList.zodiac"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.chart_half">
            <Echarts type="customs" :customs="customs.constellation" title="在职员工星座分布" :options="statistics.constellation" ref="echart11" echart-type="pie" >
                <div slot="table">
                    <table-list name="星座" :data="tableList.constellation"></table-list>
                </div>
            </Echarts>
        </div>
        <div :class="s.bar">
            <Echarts type="customs" :customs="customs.dep" title="部门人数top9统计" :options="statistics.dep"  ref="echart12" echart-type="bar" >
                <div slot="table">
                    <table-list name="部门" :data="tableList.dep"></table-list>
                </div>
            </Echarts>
            <Echarts type="customs" :customs="customs.job" title="岗位人数top9统计" :options="statistics.job"  ref="echart13" echart-type="bar" >
                <div slot="table">
                    <table-list name="岗位" :data="tableList.job"></table-list>
                </div>
            </Echarts>
            <Echarts type="customs" :customs="customs.native" title="籍贯人数top9统计" :options="statistics.native"  ref="echart14" echart-type="bar" >
                <div slot="table">
                    <table-list name="籍贯" :data="tableList.native"></table-list>
                </div>
            </Echarts>
            <Echarts type="customs" :customs="customs.account" title="户口所在地人数top9统计" :options="statistics.account"  ref="echart15"  echart-type="bar" >
                <div slot="table">
                    <table-list name="户口所在地" :data="tableList.account"></table-list>
                </div>
            </Echarts>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
import mixin from '../mixin'
import tableList from './tableList.vue'
import Echarts from '@2haohr-major/com-echarts'

export default {
    components: { tableList, Echarts },
    mixins: [mixin],
    data() {
        return {
            exportImgAble: false, // 是否导出统计图
            exportTableAble: false // 是否导出数据表
        }
    },
    methods: {

    },
    mounted() {
        for (let key in this.customs) {
            this.customs[key] = Object.assign(this.customs[key], {exportImgAble: this.exportImgAble, exportTableAble: this.exportTableAble})
        }
    }
}
</script>
<style module="s" lang="scss">
.content {
    margin-top: 30px;

    &::after {
        content: " ";
        clear: both;
        display: block;
    }
}

.chart_half {
    float: left;
    width: 50%;
    padding: 0 10px;
    margin-bottom: 60px;

    &:nth-child(2n+1) {
        border-right: 1px dashed #e9eaec;
    }
}

.bar {
    clear: both;

    > div {
        margin-bottom: 60px;
    }
}
</style>