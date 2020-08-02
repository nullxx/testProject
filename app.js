/* START MODULES IMPORT */
var express = require('express');
var logger = require('morgan');

/* START ROUTES IMPORT */
const servicesRoute = require('./routes/Services')
const authRoute = require('./routes/auth');
/* END ROUTES IMPORT */

/* START INTERNAL MODULES IMPORT */
const Auth = require('./src/Auth');
/* END INTERNAL MODULES IMPORT */

require('./src/LoadModules')().then(() => { /* START LOADING INTERNAL MODULES AND SERVICES */
    /* END LOADING INTERNAL MODULES AND SERVICES */
})

/* START EXPRESS CONFIG */
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* END EXPRESS CONFIG */

/* START USAGE ROUTES */
app.all("*", Auth.expressAuth)
app.use('/', servicesRoute);
app.use('/auth', authRoute)
/* END USAGE ROUTES */

module.exports = app;






