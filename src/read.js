const watch = require('node-watch')
const fs = require('fs')

const startReading = () => {
    watch('logs.txt', (event, name) => {

        const output = fs.readFileSync('logs.txt', 'utf8')
        const arr = output.split('\n').filter(element => element !== '')

        const clean = []
        arr.forEach(element => {
            const obj = element.split(',')
            const timestamp = obj[0].split(':')[1]
            const message = obj[1].slice(10)
            clean.push({ timestamp, message })
        })

        const groups = {}

        clean.forEach(element => {
            const message = element.message
            if (message.includes('START') || message.includes('END') || message.includes('REPORT')) {
                const id = element.message.replace(/\\n"}/g, ' ').replace('\\tDuration', ' ').split(' ')[2]
                const list = groups[id]
                if (list) {
                    list.push(element)
                } else {
                    groups[id] = [element]
                }
            } else {
                const date = element.message.split('\\t')[0]
                const id = element.message.split('\\t')[1]
                const log = element.message.split('\\t')[2].replace(/\\n"}/g, '')
                const list = groups[id]
                if (list) {
                    list.push(element)
                } else {
                    groups[id] = [log]
                }
            }
        })


        let lastProperty = null
        let start = null
        let end = null
        let report = null

        for (const property in groups) {
            lastProperty = property
        }

        if (lastProperty) {
            groups[lastProperty].forEach(element => {
                if (element.message.includes('START')) {
                    start = true
                } else if (element.message.includes('REPORT')) {
                    report = true
                } else if (element.message.includes('END')) {
                    end = true
                }
            })
        }
        if (start && end && report) {
            console.log('............')
            groups[lastProperty].forEach(element => {
                if (element.message.includes('START')) {
                    //console.log(`TIME: ${new Date(Number(element.timestamp)).toLocaleTimeString("en-US")}`)
                    console.log('\x1b[32m%s\x1b[0m', `TIME: ${new Date(Number(element.timestamp)).toLocaleTimeString("en-US")} - MESSAGE: ${element.message.replace('}', ' ')}`)
                } else if (element.message.includes('END') || element.message.includes('REPORT')) {
                    console.log('\x1b[32m%s\x1b[0m', `TIME: ${new Date(Number(element.timestamp)).toLocaleTimeString("en-US")} - MESSAGE: ${element.message.replace('}', ' ')}`)
                } else {
                    if (element.message.includes('Error')) {
                        console.log('\x1b[31m%s\x1b[0m', `TIME: ${new Date(Number(element.timestamp)).toLocaleTimeString("en-US")} - MESSAGE: ${element.message.split('\\t')[2].replace(/\\n"}/g, ' ')}`)
                    } else {
                        console.log('\x1b[32m%s\x1b[0m', `TIME: ${new Date(Number(element.timestamp)).toLocaleTimeString("en-US")} - MESSAGE: ${element.message.split('\\t')[2].replace(/\\n"}/g, ' ')}`)
                    }

                }
            })
        }
    })
}

module.exports = startReading

