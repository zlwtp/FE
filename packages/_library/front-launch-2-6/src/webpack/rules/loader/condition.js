
const path = require('path')

module.exports = ({ environment }) => ({
    loader: path.resolve(__dirname, './_transform_condition.js'),
    options: {
        environment
    }
})
