export default {
    statistics: {
        theme: '2haohr_default',
        gender: {
            text: '1:2',
            backgroundColor: 'rgba(255,255,255,0)',
            legend: {
                orient: 'vertical',
                left: '65%',
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工性别分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        work_age: {
            backgroundColor: 'rgba(255,255,255,0)',
            legend: {
                orient: 'vertical',
                left: '65%',
                // data:['6个月内:5人','1年内:3人','1~2年:4人','2~3年:10人','3~5年:5人','5年以上:10人'],
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工司龄分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    /* data:[
                     {value:5, name:'6个月内:5人'},
                     {value:3, name:'1年内:3人'},
                     {value:4, name:'1~2年:4人'},
                     {value:10, name:'2~3年:10人'},
                     {value:5, name:'3~5年:5人'},
                     {value:10, name:'5年以上:10人'}
                     ] */
                    data: []
                }
            ]
        },
        service_age: {
            backgroundColor: 'rgba(255,255,255,0)',
            legend: {
                orient: 'vertical',
                left: '65%',
                // data:['6个月内:5人','1年内:3人','1~2年:4人','2~3年:10人','3~5年:5人','5年以上:10人'],
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工工龄分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    /* data:[
                     {value:5, name:'6个月内:5人'},
                     {value:3, name:'1年内:3人'},
                     {value:4, name:'1~2年:4人'},
                     {value:10, name:'2~3年:10人'},
                     {value:5, name:'3~5年:5人'},
                     {value:10, name:'5年以上:10人'}
                     ] */
                    data: []
                }
            ]
        },
        age: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                // data:['60后:5人','70后:3人','80后:4人','90后:10人','00后:5人'],
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工年代分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    /* data:[
                     {value:5, name:'60后:5人'},
                     {value:3, name:'70后:3人'},
                     {value:4, name:'80后:4人'},
                     {value:10, name:'90后:10人'},
                     {value:5, name:'00后:5人'}
                     ] */
                    data: []
                }
            ]
        },
        education: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                // data:['小学:0人','初中:2人','高中:3人','大专:5人','本科:15人','硕士:4人','博士:1人'],
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工学历分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        age_group: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工年龄段分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        work_type: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工工作性质分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 5,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        zodiac: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工生肖分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 0,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        constellation: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工星座分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 0,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        isMarried: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                // data:['已婚男性:5人','未婚男性:3人','已婚女性:4人','未婚女性:10人','其他:5人'],
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '在职员工已婚情况分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 0,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        hasChildren: {
            backgroundColor: 'rgba(255,255,255,0)',
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}<br/>比例:{d}%',
                textStyle: {
                    fontSize: 12
                }
            },
            legend: {
                orient: 'vertical',
                left: '65%',
                data: [],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                top: 'middle',
                formatter: '{name}'
            },
            series: [
                {
                    animation: false,
                    name: '女员工已育情况分布',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],
                    center: ['35%', '50%'],
                    hoverAnimation: false,
                    selectedOffset: 0,
                    label: {
                        normal: {
                            show: false,
                            position: 'outer'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: []
                }
            ]
        },
        native: {
            title: {
                show: false,
                text: '员工籍贯 top7 统计'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                orient: 'horizontal',
                data: ['籍贯人数'],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 'bottom',
                formatter: '{name}'
            },
            xAxis: [
                {
                    type: 'category',
                    // data : ['湖北','广东','广西','四川','湖南','陕西','河北','其他省份'],
                    data: [],
                    splitLine: {show: false}
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 人'
                    },
                    minInterval: 1
                }
            ],
            series: [
                {
                    animation: false,
                    name: '籍贯人数',
                    type: 'bar',
                    stack: 'group',
                    // data: [7,6,5,4,3,2,1,8],
                    data: [],

                    label: {
                        normal: {
                            show: false,
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        },
        account: {
            title: {
                show: false,
                text: '员工户口所在地 top7 统计'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                orient: 'horizontal',
                data: ['户口所在地人数'],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 'bottom',
                formatter: '{name}'
            },
            grid: {
                top: '23%',
                left: 0,
                right: 10,
                bottom: 50,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    // data : ['湖北','广东','广西','四川','湖南','陕西','河北','其他省份'],
                    data: [],
                    splitLine: {show: false}
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 人'
                    },
                    minInterval: 1
                }
            ],
            series: [
                {
                    animation: false,
                    name: '户口所在地人数',
                    type: 'bar',
                    stack: 'group',
                    // data: [7,6,5,4,3,2,1,8],
                    data: [],
                    label: {
                        normal: {
                            show: false,
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        },
        dep: {
            title: {
                show: false,
                text: '部门人数 top7 统计'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                orient: 'horizontal',
                data: ['部门人数'],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 'bottom',
                formatter: '{name}'
            },
            xAxis: [
                {
                    axisLabel: {
                        interval: 0,
                        formatter: function(val) {
                            if (val) { return val.length > 8 ? val.substr(0, 8) + '...' : val }
                        }
                    },
                    type: 'category',
                    data: [],
                    splitLine: {show: false}
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 人'
                    },
                    minInterval: 1
                }
            ],
            series: [
                {
                    animation: false,
                    name: '部门人数',
                    type: 'bar',
                    stack: 'group',
                    // data: [7,6,5,4,3,2,1,8],
                    data: [],
                    label: {
                        normal: {
                            show: false,
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        },
        job: {
            title: {
                show: false,
                text: '岗位人数 top7 统计'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                orient: 'horizontal',
                data: ['岗位人数'],
                itemGap: 8,
                itemWidth: 12,
                itemHeight: 12,
                bottom: 'bottom',
                formatter: '{name}'
            },
            xAxis: [
                {
                    formatter: function(val) {
                        if (val) { return val.length > 8 ? val.substr(0, 8) + '...' : val }
                    },
                    type: 'category',
                    // data : ['前端开发工程师','C#开发工程师','客服','人事专员','产品经理','测试工程师','销售代表','其他岗位'],
                    data: [],
                    splitLine: {show: false}
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 人'
                    },
                    minInterval: 1
                }
            ],
            series: [
                {
                    animation: false,
                    name: '岗位人数',
                    type: 'bar',
                    stack: 'group',

                    // data: [7,6,5,4,3,2,1,8],
                    data: [],
                    label: {
                        normal: {
                            show: false,
                            formatter: '{c}%'
                        }
                    }
                }
            ]
        }
    },
    tableList: {
        gender: [],
        education: [],
        age: [],
        age_group: [],
        work_type: [],
        work_age: [],
        service_age: [],
        isMarried: [],
        hasChildren: [],
        zodiac: [],
        constellation: [],
        dep: [],
        job: [],
        native: [],
        account: []
    },
    customs: {
        sex: {
            type: 'sex',
            submiting: false
        },
        education: {
            type: 'education',
            submiting: false
        },
        age: {
            type: 'age',
            submiting: false
        },
        birthday: {
            type: 'birthday',
            submiting: false
        },
        work_type: {
            type: 'work_type',
            submiting: false
        },
        work_age: {
            type: 'work_age',
            submiting: false
        },
        service_age: {
            type: 'service_age',
            submiting: false
        },
        marriage: {
            type: 'marriage',
            submiting: false
        },
        birth_children: {
            type: 'birth_children',
            submiting: false
        },
        zodiac: {
            type: 'zodiac',
            submiting: false
        },
        constellation: {
            type: 'constellation',
            submiting: false
        },
        dep: {
            type: 'dep',
            submiting: false
        },
        job: {
            type: 'job',
            submiting: false
        },
        native: {
            type: 'native',
            submiting: false
        },
        account: {
            type: 'account',
            submiting: false
        }
    }
}
