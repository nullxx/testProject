const ActionsLog = require('../ActionsLog');
const Scope = require('./Scope');
const UserManagement = require('../UserManagement')
const User = require('../User')
const jwt = require('jsonwebtoken');
const { Config } = require('../Config');


/**
 * Auth class
 */
class Auth {
    scopes = null;

    constructor() {
        return new Promise((res) => {
            // CREATE SHARED INSTANCE
            if (this.createSingleton()) {
                this.init()
                    .then(() => {
                        res(this)
                    })
                    .catch(err => {
                        ActionsLog.reportActivity(3, err)
                    })
            } else {
                res(Auth._sharedInstance);
            }
        })
    }
    init() {
        return new Promise((res, rej) => {
            // GET LOGIN SCOPES
            Scope.getScopes().then(() => {
                res()
            }).catch((err => {
                rej(err)
            }))
        })
    }
    /**
     * Login to the system
     * @param {User} user User to be registered
     * @param {string} scope Login scope
     */
    login = (nickname, password, scope) => {
        return new Promise((res, rej) => {
            if (!nickname || !password) return rej(new Error("Missing 'nickname' or 'password' param."));
            if (!scope) return rej(new Error("Missing 'scope' param."))
            if (Scope.isAvailable(scope)) {
                UserManagement.login(new User(nickname, password))
                    .then(user => {
                        res({
                            user,
                            token: this.generateSampleToken(user)
                        })
                    }).catch(err => {
                        rej(err)
                    })
            } else {
                rej(new Error("Provided scope is not available."))
            }
        })

    }
    /**
     * Getter of scopes
     */
    getScopes = () => {
        return this.scopes;
    }

    /**
    * Creates shared instance for this class
    */
    createSingleton = () => {
        if (Auth._sharedInstance) {
            return false
        } else {
            Auth._sharedInstance = this;
            return true
        }
    }
    /**
     * Generate JWT token for authorization
     * @param {object} user Object that represents User class
     */
    generateSampleToken = (user) => {
        const token = jwt.sign(user, "secret", { /* SECRET should be generated randomly */
            expiresIn: 60 * 60 * 24 /* 24 hours */
        })
        return token;
    }
    /**
     * Verify given token JWT
     * @param {string} token JWT token
     */
    verifySampleToken = (token) => {
        return new Promise((res, rej) => {
            jwt.verify(token, "secret", (err, user) => { /* SECRET should be generated randomly */
                if (err) return rej(err);
                res(user)
            })
        })
    }
    /**
     * 
     * @param {Request<ParamsDictionary, any, any, qs.ParsedQs>} req Express request
     * @param {Response<any>} res Express response
     * @param {any} next Express next()
     */
    static expressAuth = (req, res, next) => {
        res.setHeader('Content-Type', 'application/json');

        var noSecurePaths = Config.express.security.noSecurePaths;

        if (noSecurePaths.includes(req.path)) {

            if (req.body.scope != 'GLOBAL_USAGE') {
                res.status(401)
                    .send(
                        {
                            code: 0,
                            msg: "Unauthorized"
                        }
                    )
            } else {
                next()
            }
            return;
        }

        const authHeader = req.headers.authorization;

        if (!authHeader) return res.send({
            code: 0,
            msg: "Please provide authorization header"
        })

        const token = authHeader.split("Bearer ")[1]
        new Auth().then(auth => {
            auth.verifySampleToken(token).then(user => {
                req.user = user;
                next()
            }).catch(err => {
                res.send({
                    code: 0,
                    msg: err,
                })
                ActionsLog.reportError(6, err, null)
            })
        })
    }
}

module.exports = Auth;