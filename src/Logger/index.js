const consoleLogger = require('perfect-logger');
const { Config } = require('../Config');

/**
 * Logger Class
 */
class Logger {
    logTypes = null;
    constructor() {
        return new Promise((res) => {
            if (this.createSingleton()) {
                this.init()
                res(this)
            } else {
                res(Logger._sharedInstance)
            }
        })
    }

    init = () => {
        this.setupConsoleLogger()
    }
    /**
     * Initializes console log module
     */
    setupConsoleLogger = () => {
        consoleLogger.initialize(Config.log.consoleLog.name, Config.log.consoleLog.options);
    }
    /**
     * Displays log to console and file (or not, depends on init of consoleLogger (see this file at function setupConsoleLogger))
     * @param {number} logType Log type
     * @param {string} additionalMsg Additional message
     */
    logConsole = (logType, additionalMsg) => {
        consoleLogger.info(`Logging type ${logType} ${additionalMsg ? `=> ${additionalMsg}` : null}`)
    }
    /**
     * Logger
     * @param {number} logType Log type
     * @param {boolean} shouldSave Store in DB
     * @param {boolean} displayConsole Display in console
     * @param {string} additionalMsg Additional message
     */
    log = (logType, shouldSave, displayConsole, additionalMsg, userId) => {
        if (displayConsole) this.logConsole(logType, additionalMsg);
        if (shouldSave) null /* Save to a real db, if necessary use userId */
    }
    /**
     * Creates shared instance of this class
     */
    createSingleton = () => {
        if (Logger._sharedInstance) {
            return false
        } else {
            Logger._sharedInstance = this;
            return true
        }
    }
}

module.exports = Logger;