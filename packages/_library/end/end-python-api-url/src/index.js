const {environment} = require('@2haohr/end-env')

module.exports = {
    'dev-server': 'https://api-dev.2haohr.com',
    dev: 'https://api-dev.2haohr.com',
    test: 'https://api-test.2haohr.com',
    pd: 'https://api.2haohr.com'
}[environment]
