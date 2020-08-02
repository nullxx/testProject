/* START MODULES IMPORT */
var express = require('express');
const Cloudinary = require('../../../src/Services/Cloudinary');
var router = express.Router();
/* END MODULES IMPORT */

/* START INTERNAL MODULES IMPORT */
const ActionsLog = require('../../../src/ActionsLog')
/* END INTERNAL MODULES IMPORT */

router.get('/:expType', (req, res) => {
    const loggedUser = req.user;
    ActionsLog.reportActivity(9, `Getting export REQUEST (${JSON.stringify(req.query)})(${JSON.stringify(req.params)}) `, loggedUser.id)

    const exportType = req.params.expType;
    const { limitResources } = req.query;

    executeExportType({ apiOpts: { max_results: 500 }, limitResources }, exportType)
        .then((result) => {
            ActionsLog.reportActivity(10, `Getting statistics SUCCESS`, loggedUser.id)
            res.set('Content-Type', 'application/octet-stream'); /* Change default ('application/json') because returning any type of data (json, plain text, ...)*/
            res.send(result)
        })
        .catch(err => {
            ActionsLog.reportActivity(11, `Getting statistics FAILURE => ${err.message}`, loggedUser.id)
            res.send({
                code: 0,
                msg: err.message
            })
        })
});
/* START UTILS FUNCTIONS */
/**
 * Get result of exportation
 * @param {object} resourcesOpts Cloudinary resources options
 * @param {string} exportType Example: 'csv', 'json', ...
 */
const executeExportType = (resourcesOpts, exportType) => {
    return new Promise((res, rej) => {
        if (!resourcesOpts.limitResources || !exportType) return rej(new Error("Please specify params 'limitResources' and 'exportType'."))
        switch (exportType) {
            case 'csv':
                generateCSV(resourcesOpts).then((result) => {
                    res(result);
                }).catch(err => {
                    rej(err);
                })
                break;
            default:
                rej(new Error("Export type not available"))
                break;
        }
    })
}
/* END UTILS FUNCTIONS */

/* START EXPORT MODES */
/**
 * Generate CSV report
 * @param {object} resourcesOpts Cloudinary resources options
 */
const generateCSV = (resourcesOpts) => {
    return new Promise((res, rej) => {
        const cloudinary = new Cloudinary();
        cloudinary.getResources(resourcesOpts.apiOpts, resourcesOpts.limitResources)
            .then((allResources) => {
                try {
                    res(cloudinary.exportToCSV(allResources));
                } catch (err) {
                    rej(err);
                }
            })
            .catch(err => {
                rej(err);
            })
    })
}
/* END EXPORT MODES */
module.exports = router;