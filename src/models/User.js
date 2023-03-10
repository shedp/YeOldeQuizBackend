const db = require('../db/init');

class User {

    constructor({ user_id, username, user_password, highest_score }) {
        this.id = user_id;
        this.title = username;
        this.password = user_password;
        this.highest_score = highest_score;
    }

    static async findById(id) {
        return new Promise (async (resolve, reject) => {
            try {
                const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
                if (response.rows.length != 1) {
                    throw new Error("Unable to locate user.")
                }
                let users = new User(response.rows[0]);
                resolve(users);
            } catch (error) {
                reject("Users not found")
                console.log(err)
            }
        })
        
    }

    static async findByUsername(username) {
        return new Promise (async (resolve, reject) => {
            try {
                // console.log(username)
                const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
                if (response.rows.length != 1) {
                    throw new Error("Unable to locate user.")
                }
                let user =  new User(response.rows[0]);
                resolve(user);
            } catch (err) {
                reject("User not found");
                console.log(err);
            }
        })
        
    }

    static async create(data) {
        return new Promise (async (resolve, reject) => {
            try {
                const { username, password } = data;
                // console.log('Users model: ', process.env.DB_URL)
                let response = await db.query("INSERT INTO users (username, user_password) VALUES ($1, $2) RETURNING user_id;",
                [username, password]);
                const newId = response.rows[0].user_id;
                const newUser = await User.findById(newId);
                resolve(newUser);
            } catch (err) {
                reject("User could not be created")
                console.log(err);
            }
        })
    }

    static updateHighScore(score, id) {
        return new Promise(async (resolve, reject) => {
            try {
                let currentScore = await db.query("SELECT highest_score FROM users WHERE user_id = $1", [id])
                currentScore = currentScore.rows[0].highest_score;
                if(score > currentScore) {
                    let result = await db.query("UPDATE users SET highest_score = $1 WHERE user_id = $2 RETURNING *;", [score, id])
                    resolve(result.rows[0])
                } else {
            resolve("Score not higher than current highest score.")
        }} catch (err) {
            console.log(err)
            reject("Could not update user")
        }
        })
        }

}

module.exports = User;
