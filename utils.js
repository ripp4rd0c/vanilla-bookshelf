// functions to parse body data and write to database
const fs = require('fs');

function writeToDatabase(data){
    try {
        fs.writeFileSync('./data/books.json', data, 'utf-8')
    } catch (error) {
        console.log(error, "WRITING TO DATABASE FAILED");
    }
}

function parseBodyData(req){
    return new Promise((resolve, _) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })
        req.on('end', () => {
            resolve(JSON.parse(body));
        })
    })
}

module.exports = {
    parseBodyData,
    writeToDatabase
}