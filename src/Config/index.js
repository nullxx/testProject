const { dbConfig } = require('./database');
const { consoleLog } = require('./consoleLog');
const { logOptions } = require('./logOptions')
const { express } = require('./express')
const { cloudinary } = require('./cloudinary')
module.exports.Config = {
    dbConfig,
    log: {
        consoleLog,
        options: logOptions
    },
    express,
    cloudinary
}