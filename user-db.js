const User = require('./user.js')

class UserDB {
    constructor() {
        this.db = new Map();
    }


    userExists(username) {
        return this.db.has(username);
    }

    getUser(username) {
        return this.db.get(username);
    }

    getUserByID (id) {
        const res = Array.from(this.db).find(
            ([k, user]) => user.matchUserID(id)
        );
        if (res) {
            return res[1];
        } else {
            return; 
        }
    }

    createUser(username) {
        if (this.userExists(username)) {
            return this.getUser(username).userInfo();
        } else {
            this.db.set(username, new User(username))
            return this.getUser(username).userInfo();
        }
    }

    userList() {
        return Array.from(this.db).map(
            ([k, user]) => user.userInfoRaw()
        );
    }
}

const db = new UserDB();


module.exports = db;