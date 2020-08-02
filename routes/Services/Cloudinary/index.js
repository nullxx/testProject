/* START MODULES IMPORT */
var express = require('express');
var router = express.Router();
/* END MODULES IMPORT */

/* START INTERNAL MODULES IMPORT */
var statisticsRoute = require('./statistics');
var exportRoute = require('./export');
/* END INTERNAL MODULES IMPORT */

/* START ROUTES USE */
router.use('/', statisticsRoute);
router.use('/', exportRoute);
/* END ROUTES USE */

module.exports = router;