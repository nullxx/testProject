/* START IMPORT MODULES */
var express = require('express');
var router = express.Router();
const Cloudinary = require('../../../src/Services/Cloudinary')
const ActionsLog = require('../../../src/ActionsLog')
/* END IMPORT MODULES */

router.get('/statistics', (req, res) => {
    const loggedUser = req.user;
    ActionsLog.reportActivity(6, `Getting statistics REQUEST (${JSON.stringify(req.query)})()`, loggedUser.id)

    const { limitResources, options } = req.query;
    getStatistics(
        { apiOpts: { max_results: 500 }, limitResources },
        options
    )
        .then(result => {
            ActionsLog.reportActivity(7, `Getting statistics SUCCESS`, loggedUser.id)

            res.send({
                code: 1,
                msg: "Successfull",
                data: result
            })
        })
        .catch(err => {
            ActionsLog.reportError(8, `Getting statistics FAILURE => ${err.message}`, loggedUser.id)
            res.send({
                code: 0,
                msg: err.message
            })
        })
})
/* START STATICS FUNCTIONS */
/**
 * 
 * @param {object} resourcesOpts Cloudinary resources options
 * @param {object} statisticsOpts Statistics options (["size", "avgSze", "format"])
 */
const getStatistics = (resourcesOpts, statisticsOpts) => {
    return new Promise((res, rej) => {
        if (!resourcesOpts.limitResources || !statisticsOpts) return rej(new Error("Please specify params 'limitResources' and 'options'."))
        const cloudinary = new Cloudinary()
        cloudinary.getResources(resourcesOpts.apiOpts, resourcesOpts.limitResources)
            .then((allResources) => {
                const statistics = cloudinary.generateStatistics(allResources, statisticsOpts);
                res(statistics);

            })
            .catch(err => {
                rej(err)
            })
    })
}
/* START STATICS FUNCTIONS */
module.exports = router;