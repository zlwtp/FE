
const { readdirSync, readFileSync } = require('fs')
const { resolve } = require('path')

module.exports = readdirSync(resolve(__dirname, `./mixin`)).map(name => {
    return readFileSync(resolve(__dirname, `./mixin/${name}`))
}).join('\n')
