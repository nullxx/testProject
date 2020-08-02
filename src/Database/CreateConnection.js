const { readJson } = require('../Utils/')
/**
 * Creates connection to DB
 * @param {object} dbConfig DB Config
 */
module.exports.CreateConnection = (dbConfig) => {
    return new Promise((res, rej) => { /* PROMISE BECAUSE OF TIME DELAY OF DB CONN */
        readJson(dbConfig.simulate.path)
            .then(jsonData => {
                if (jsonData) return res(jsonData)
                rej(new Error("No db data found"))
            })
            .catch(err => {
                rej(err)
            })

    })
}
