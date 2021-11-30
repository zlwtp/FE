/**
 * Exec no return
 */

module.exports = (command, option = {}) => {
    const exec = require('./exec')
    return exec(command, {
        stdio: 'inherit',
        ...option
    })
}
