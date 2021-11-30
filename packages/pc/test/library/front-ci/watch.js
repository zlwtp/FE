
const launch = require('@2haohr/front-launch-2-6')
const getOption = require('./getOption')

module.exports = ({ root, port }) => launch({
    ...getOption(root),
    watch: { port }
})
