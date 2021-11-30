import config from './config'
export default {
    data() {
        return {
            statistics: config.statistics,
            tableList: config.tableList,
            customs: config.customs
        }
    },
    methods: {
        dataHandle(arr) {
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i]
                item.name = item.name.indexOf(':') > -1 ? item.name.split(':')[0] : item.name
            }
            return arr
        },
        init(data, isInit = true) {
            // 合并图表1配置  性别
            this.statistics.gender.legend.data = data.sex.pie.legend // Object.assign(this.statistics.statistics_1, data.statistics_1);
            this.statistics.gender.series[0].data = data.sex.pie.series
            this.tableList.gender = this.dataHandle(data.sex.table)
            // 合并图表3配置  司龄
            this.statistics.work_age.legend.data = data.work_age.pie.legend
            this.statistics.work_age.series[0].data = data.work_age.pie.series
            this.tableList.work_age = this.dataHandle(data.work_age.table)
            // 合并图表3配置  工龄
            this.statistics.service_age.legend.data = data.service_age.pie.legend
            this.statistics.service_age.series[0].data = data.service_age.pie.series
            this.tableList.service_age = this.dataHandle(data.service_age.table)
            // 合并图表4配置 年龄
            this.statistics.age.legend.data = data.birthday.pie.legend
            this.statistics.age.series[0].data = data.birthday.pie.series
            this.tableList.age = this.dataHandle(data.birthday.table)
            // 合并图表5配置 学历
            this.statistics.education.legend.data = data.education.pie.legend
            this.statistics.education.series[0].data = data.education.pie.series
            this.tableList.education = this.dataHandle(data.education.table)
            // 合并图表7配置  工作性质
            this.statistics.work_type.legend.data = data.work_type.pie.legend
            this.statistics.work_type.series[0].data = data.work_type.pie.series
            this.tableList.work_type = this.dataHandle(data.work_type.table)
            // 合并图表6配置  年龄段
            this.statistics.age_group.legend.data = data.age.pie.legend
            this.statistics.age_group.series[0].data = data.age.pie.series
            this.tableList.age_group = this.dataHandle(data.age.table)
            // 合并图表10配置  生肖
            this.statistics.zodiac.legend.data = data.zodiac.pie.legend
            this.statistics.zodiac.series[0].data = data.zodiac.pie.series
            this.tableList.zodiac = this.dataHandle(data.zodiac.table)
            // 合并图表11配置  星座
            this.statistics.constellation.legend.data = data.constellation.pie.legend
            this.statistics.constellation.series[0].data = data.constellation.pie.series
            this.tableList.constellation = this.dataHandle(data.constellation.table)
            // 合并图表14配置  已婚
            this.statistics.isMarried.legend.data = data.marriage.pie.legend
            this.statistics.isMarried.series[0].data = data.marriage.pie.series
            this.tableList.isMarried = this.dataHandle(data.marriage.table)

            // 合并图表15配置  已育
            this.statistics.hasChildren.legend.data = data.birth_children.pie.legend
            this.statistics.hasChildren.series[0].data = data.birth_children.pie.series
            this.tableList.hasChildren = this.dataHandle(data.birth_children.table)

            /** *****************柱状统计********************/
            // 合并图表16配置  籍贯
            this.statistics.native.xAxis[0].data = data.native.bar.xAxis
            this.statistics.native.series[0].data = data.native.bar.series
            this.tableList.native = this.dataHandle(data.native.table)
            // 合并图表17配置 户口所在地
            this.statistics.account.xAxis[0].data = data.account.bar.xAxis
            this.statistics.account.series[0].data = data.account.bar.series
            this.tableList.account = this.dataHandle(data.account.table)
            // 合并图表18配置 部门
            this.statistics.dep.xAxis[0].data = data.dep.bar.xAxis
            this.statistics.dep.series[0].data = data.dep.bar.series
            this.tableList.dep = this.dataHandle(data.dep.table)
            // 合并图表19配置 岗位
            this.statistics.job.xAxis[0].data = data.job.bar.xAxis
            this.statistics.job.series[0].data = data.job.bar.series
            this.tableList.job = this.dataHandle(data.job.table)

            /* 绘制图表 */
            // this.$broadcast('onEchartsInit', isInit);
            for (let key in this.$refs) {
                this.$refs[key].onEchartsInit()
            }
        }
    }
}
