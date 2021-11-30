
import createApp from '@2haohr/front-create-app'

const app = createApp()

app
    .task('环境变量', app => require('./env').default(app))
    .task('工具方法', app => require('./util').default(app))
    .task('统计分析', app => require('./analysis').default(app))
    .task('错误收集', app => require('./sentry').default(app))
    .task('请求处理', app => require('./api').default(app))
    .task('路由', app => require('./router').default(app))
    .task('状态管理', ['请求处理', '工具方法'], app => require('./store').default(app))
    .task('内部链接', ['路由'], app => require('@2haohr-major/front-plugin-hyperlink').default(app))
    .task('日志', ['请求处理'], app => require('./log').default(app))
    .task('过滤器', ['工具方法', '状态管理'], app => require('./filter').default(app))
    .task('校验器', app => require('@2haohr-major/front-plugin-validator').default(app))
    .task('基础组件', ['状态管理'], app => require('./com').default(app))
    // 注入定义的所有任务
    .use(app.getAllTask())

export default app
