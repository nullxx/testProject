const ActionsLog = require('./ActionsLog')
const Cloudinary = require('./Services/Cloudinary')
const { Config } = require('./Config')
/**
 * Load modules (services)
 */
module.exports = () => {
    return new Promise((res, rej) => {
        console.log("########################## LOADING MODULES ##########################")
        const Database = require('./Database')
        const Logger = require('./Logger')
        const Auth = require('./Auth')
        new Database().then(() => {
            console.info("##########··················  DB READY  ···················##########");

            new Logger().then(() => {
                console.info("##########················  LOGGER READY  ·················##########");

                new Auth().then(() => {
                    console.info("##########·················  AUTH READY  ··················##########");

                    new Cloudinary(Config.cloudinary.options.cloudName, Config.cloudinary.options.apiKey, Config.cloudinary.options.apiSecret)
                    console.info("##########···········  CLOUDINARY READY  ··················##########");

                    console.info("###################### FINISHED LOADING MODULES #####################")
                    ActionsLog.reportActivity(2, "MODULES LOADED")
                    res()
                })
            })
        })
    })
}