/* START MODULES IMPORT */
var express = require('express');
var router = express.Router();
const crypto = require('crypto')
var bodyParser = require('body-parser')
/* END MODULES IMPORT */

/* START INTERNAL MODULES IMPORT */
const Auth = require('../src/Auth')
const ActionsLog = require('../src/ActionsLog');
const { rejects } = require('assert');
/* END INTERNAL MODULES IMPORT */

router.post('/', (req, res) => {
    const { nickname, password, scope } = req.body;
    const hashedPwd = crypto.createHash('sha256').update(password).digest('hex');
    new Auth().then(auth => {
        auth.login(nickname, hashedPwd, scope)
            .then(lgn => {
                ActionsLog.reportActivity(5, "Login successfull", lgn.user.id)
                res.send({
                    code: 1,
                    msg: "Login successful",
                    data: {
                        token: lgn.token
                    }
                })
            })
            .catch(err => {
                ActionsLog.reportError(4, err)
                res.send({
                    code: 0,
                    msg: "Login unsuccessful"
                })
            })
    })
})

module.exports = router;