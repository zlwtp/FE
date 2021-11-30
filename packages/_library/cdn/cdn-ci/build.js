
// 将src目录内容copy到dist目录
const { mkdir, cp } = require('@2haohr/shell')

mkdir('-p', './dist')
cp('-rf', './src/*', './dist')
