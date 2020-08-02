const { CreateConnection } = require('./CreateConnection');
const { Config } = require('../Config')
/**
 * Database Class
 */
class Database {
    dbData = null;
    dbConfig = Config.dbConfig;
    constructor() {
        return new Promise((res, rej) => {
            // CREATE SHARED INSTANCE
            if (this.createSingleton()) {
                this.init()
                    .then(() => {
                        res(this)
                    })
                    .catch(err => {
                        rej(err)
                    })
            } else {
                res(Database._sharedInstance);
            }
        })


    }
    init = () => {
        return new Promise((res, rej) => {
            // CREATE CONNECTION
            CreateConnection(this.dbConfig)
                .then(dbData => {
                    this.dbData = dbData;
                    res()
                })
                .catch(error => {
                    rej(`Unable to connect to the database: ${error}`)
                })
        })
    }
    /**
     * Creates shared instance for this class
     */
    createSingleton = () => {
        if (Database._sharedInstance) {
            return false
        } else {
            Database._sharedInstance = this;
            return true
        }
    }
}

module.exports = Database;
