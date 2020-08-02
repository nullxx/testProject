module.exports = class Scope {
    /**
     * Returns stored scopes from DB
     */
    static getScopes = () => {
        return new Promise((res, rej) => {
            const Database = require('../Database');
            new Database().then(database => {
                const { dbData } = database;
                this.scopes = dbData.scopes;
                res()
            }).catch(err => {
                rej(err)
            })
        })
    }
    /**
     * Check if scope is available
     * @param {string} scope Login Scope
     */
    static isAvailable = (scope) => {
        for (let i = 0; i < this.scopes.length; i++) {
            const e = this.scopes[i];
            if (e.shortDescription == scope) {
                return true;
            }
        }
        return false;
    }
}