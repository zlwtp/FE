
const Axios = require('axios')

const baseURL = {
    'dev': 'https://api-dev.2haohr.com',
    'test': 'https://api-test.2haohr.com',
    'beta': 'https://api.2haohr.com',
    'pd': 'https://api.2haohr.com'
}[process.env.DM_INC_NPM || 'pd']

module.exports = Axios.create({ baseURL })
