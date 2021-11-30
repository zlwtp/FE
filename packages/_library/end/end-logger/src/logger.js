const dayjs = require('dayjs')

const levels = ['info', 'warn', 'error']

const log = (level, module, type, detail) => {
    if (!levels.includes(level)) {
        level = 'info'
        if (process.env.NODE_ENV === 'development') {
            console.warn('level错误！必须是`info`、`warn`、`error`，已设置为info')
        }
    }
    console.log(`[${dayjs().format('YYYY-MM-DD HH:mm:ss,SSS')}]`,
        `[${module}]`,
        `${level.toUpperCase()}：`,
        `${type}`,
        JSON.stringify(detail)
    )
}
const logger = {
    module: null,
    register(module) {
        this.module = module
    }
}

levels.forEach(item => {
    logger[item] = (type, detail) => {
        log(item, logger.module, type, detail)
    }
})

module.exports = logger
