export default [
    {
        name: 'employeeReportBoss',
        path: '/',
        component: r => require.ensure([], () => r(require('./page/report/index.vue')), 'employeeReportBoss')
    }
]
