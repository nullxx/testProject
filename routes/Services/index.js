/* START MODULES IMPORT */
var express = require('express');
var router = express.Router();
/* END MODULES IMPORT */

/* START ROUTES IMPORT */
var cloudinaryRoute = require('./Cloudinary');
/* END ROUTES IMPORT */

/* START ROUTES USE */
router.use('/cloudinary', cloudinaryRoute);
/* END ROUTES USE */

module.exports = router;