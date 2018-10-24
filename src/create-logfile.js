const fs = require('fs')

const filePath = 'logs.txt'
const fileContent = '{"timestamp":1540382490759,"message":"START polling new logs}'

const createLogFile = () => {
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) throw err
    })
}


module.exports = createLogFile