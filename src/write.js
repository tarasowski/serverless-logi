let functionName
let regionName

const init = () => {
    process.argv.forEach(element => {
        if (element.includes('function')) {
            const functionNameArgument = element.split('=')[1]
            functionName = functionNameArgument
        } else if (element.includes('region')) {
            const regionNameArgument = element.split('=')[1]
            regionName = regionNameArgument
        }
    })

}

init()


const fs = require('fs')
const AWS = require('aws-sdk')
const cloudwatchlogs = new AWS.CloudWatchLogs({ region: regionName || 'eu-west-1' })
const crypto = require('crypto')

const group = `/aws/lambda/${functionName}`

const describeStreams = async () => {

    const params = {
        logGroupName: group,
        descending: true,
        limit: 3,
        orderBy: 'LastEventTime'
    }
    const res = await cloudwatchlogs.describeLogStreams(params).promise()
    const streamName = res.logStreams[0].logStreamName
    return streamName
}

const getLogs = async (logStream) => {
    const params = {
        logGroupName: group,
        logStreamName: logStream,
    }
    const res = await cloudwatchlogs.getLogEvents(params).promise()
    return res
}

const createHash = (string) => {
    return crypto.createHash('md5').update(string).digest('hex')
}

const getLastEvent = async () => {
    const last = await describeStreams()
    const logs = await getLogs(last)
    const events = logs.events.map(element => {
        return {
            timestamp: element.timestamp,
            message: element.message
        }
    })
    let string = ''
    events.forEach(element => {
        string += `${JSON.stringify(element)}\n`
    })
    const file = fs.readFileSync('logs.txt', 'utf8')
    const stringHash = createHash(string)
    const fileHash = createHash(file)
    if (fileHash === stringHash) {
        return
    }
    console.log('....received new logs from CloudWatch - Time:', new Date().toLocaleTimeString())
    fs.writeFileSync('logs.txt', string)
}

module.exports = getLastEvent
