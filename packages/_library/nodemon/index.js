
module.exports = (config = {}) => {
    const nodemon = require('nodemon')
    const script = config.script || './src/app.js'
    const watch = config.watch || []
    const events = config.events || {}
    const port = config.port || 9229

    const execMap = {}

    if (process.env.inspect) {
        execMap.js = `node --inspect=${port}`
    }

    nodemon({
        script,
        watch,
        execMap
    })

    let hasStart = false

    nodemon
        .on('start', function() {
            if (!hasStart) { // hack 修改代码restart事件触发多次start事件
                events.start && events.start()
                hasStart = true
            }
        })
        .on('quit', function() {
            events.quit && events.quit()
            console.log('App has quit')
            process.exit()
        })
        .on('restart', function(files) {
            console.log('App restarted due to: ', files)
        })
}
