module.exports = class User {
    constructor(nickname, password) {
        this.setNickname(nickname);
        this.setPassword(password);
    }
    setNickname = (nickname) => {
        if (nickname) return this.nickname = nickname;
    }
    setPassword = (password) => {
        if (password) return this.password = password;
    }
}