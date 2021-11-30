
module.exports = (command, option = {}) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        let rs = ''
        const child = spawn(command, {
            shell: true,
            stdio: [
                'inherit',
                'pipe',
                'pipe'
            ],
            env: {
                FORCE_COLOR: true,
                ...process.env
            },
            ...option
        })
        child.stdout && child.stdout.on('data', data => { rs += data.toString() })
        child.stderr && child.stderr.on('data', data => {
            process.stderr.write(data)
            process.exit(1)
        })
        child.on('close', code => { 
            if (code !== 0) {
                process.exit(code)
            }
            resolve(rs) 
        })
    })
}
