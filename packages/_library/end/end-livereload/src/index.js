/**
 * livereload 中间人socket，用于桥接watching和client
 */

const socketIO = require('socket.io')
const http = require('http')

module.exports = app => {
    const server = http.createServer(app.callback())
    const io = socketIO(server)
    io.on('connection', socket => {
        socket.emit('connect success')

        socket.on('hash', (channel, hash) => {
            io.emit(`hash${channel}`, hash)
        })

        socket.on('compiling', channel => {
            io.emit(`compiling${channel}`)
        })

        socket.on('refresh', (channel, hot) => {
            io.emit(`refresh${channel}`, hot)
        })
    })

    return server
}
