const path = require('path')
module.exports.dbConfig = {
    simulate: {
        fileName: 'db',
        fileExtension: 'json',
        path: path.resolve('./src/Database/db.json')
    }
}