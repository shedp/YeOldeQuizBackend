const db = require("../db/init")
const { v4: uuidv4 } = require("uuid")

class Session {
	constructor({ session_id, session_token, user_id }) {
		this.session_id = session_id
		this.session_token = session_token
		this.user_id = user_id
	}

	static async create(user_id) {
		return new Promise(async (resolve, reject) => {
			try {
				const token = uuidv4().substring(0, 20)

				let response = await db.query(
					"INSERT INTO user_session (user_id, session_token) VALUES ($1, $2) RETURNING *;",
					[user_id, token]
				)

				let newSession = new Session(response.rows[0])
				resolve(newSession)
			} catch (err) {
				reject("Session could not be created")
				console.log(err)
			}
		})
	}


	static async findBySessionToken(token) {
		return new Promise(async (resolve, reject) => {
			try {
				let response = await db.query(
					"SELECT * FROM user_session WHERE session_token = $1",
					[token]
				)
				if (response.rows.length != 1) {
					throw new Error("Unable to locate session.")
				}
				let session = new Session(response.rows[0])
				resolve(session)
			} catch (err) {
				reject("Session not found")
				console.log(err)
			}
		})
	}

	async deleteSession() {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await db.query(
					"DELETE FROM user_session WHERE session_id = $1;",
					[this.session_id]
				)
				resolve("Session deleted")
			} catch (err) {
				reject("Could not delete session")
				console.log(err)
			}
		})
	}
}

module.exports = Session
