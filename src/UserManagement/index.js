const Database = require('../Database')
class UserManagement {
    /**
     * Login user to system
     * @param {User} user User to login
     */
    static login = (user) => {
        return new Promise((res, rej) => {
            new Database().then(database => {
                const { dbData } = database;
                for (let i = 0; i < dbData.users.length; i++) {
                    const dbuser = dbData.users[i];
                    if (user.nickname == dbuser.nickname && user.password == dbuser.password) {
                        /* User found */
                        res(dbuser)
                    }
                }
                rej(new Error("No user found"))
            })
        })
    }
}
module.exports = UserManagement;