const readingNewEntries = require('./read')
const writingNewEntries = require('./write')
const createLogFile = require('./create-logfile')

console.log('....creating new log file')
createLogFile()
console.log('....listeting for new logs')
readingNewEntries()

setInterval(() => {
    writingNewEntries()
    console.log('....polling CloudWatch Logs')
}, 1000)







