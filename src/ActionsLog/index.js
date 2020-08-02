const { Config } = require('../Config')
/**
 * ActionsLog class, report all actions
 */
class ActionsLog {
    /**
     * Report activity as Log
     * @param {number} acType Activity type
     * @param {string} msg Activity description message
     * @param {User} user User who made the activity
     */
    static reportActivity = async (acType, msg, user) => {
        const Logger = await new (require('../Logger'))()
        Logger.log(acType, Config.log.options.report.activity.saveDB, Config.log.options.report.activity.displayConsole, msg, user)
    }
    /**
     * Report error as Log
     * @param {number} errType Error type
     * @param {string} errMsg Error description message
     * @param {User} user User who made the activity
     */
    static reportError = async (errType, errMsg, user) => {
        const Logger = await new (require('../Logger'))()
        Logger.log(errType, Config.log.options.report.error.saveDB, Config.log.options.report.error.displayConsole, errMsg, user)
    }
}


module.exports = ActionsLog;