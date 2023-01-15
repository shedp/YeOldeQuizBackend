const db = require("../db/init")
const Score = require("./Scores")

class Round {
	constructor(data) {
		this.round_id = data.round_id
		this.game_id = data.game_id
		this.topic = data.topic
	}

	//get all rounds
	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await db.query("SELECT * FROM rounds")
				const rounds = response.rows.map((r) => new Round(r))
				resolve(scores)
			} catch (err) {
				reject("Rounds not found")
			}
		})
	}

	//get by round_id
	static findByRoundId(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let roundData = await db.query(
					`SELECT * FROM rounds WHERE round_id = $1`,
					[id]
				)
				let target = new Round(roundData.rows[0])
				resolve(target)
			} catch (err) {
				reject("Round not found")
			}
		})
	}

	//find by game_id
	static findByGameId(id){
		return new Promise(async (resolve, reject) => {
			try {
				let roundData = await db.query(
					`SELECT * FROM scores WHERE game_id = $1`,
					[id]
				)
				let target = roundData.rows.map(r => new Round(r))
				resolve(target)
			} catch (err) {
				reject("Rounds not found")
			}
		})
	}

	// create rounds
	static async create(id, topic) {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await db.query(
					"INSERT INTO rounds (game_id, topic) VALUES ($1, $2) RETURNING *",
					[id, topic]
				)
				let newRound = new Round(result.rows[0])
				await newRound.createScores()
				resolve(newRound)
			} catch (err) {
				reject("Could not create round")
				console.log(err)
			}
		})
	}

	//create scores after creating rounds
	async createScores() {
        return new Promise(async (resolve, reject) => {
            try {
                await Score.create(this.game_id, this.round_id, this.user_id)
                resolve("scores added")
            } catch (err) {
                reject("Could not add scores")
                console.log(err)
            }
        })
    }

	destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				const result = await db.query(
					"DELETE FROM rounds WHERE game_id = $1",
					[this.game_id]
				)
				resolve("round was destroyed")
			} catch (err) {
				reject("Could not destroy round")
			}
		})
	}
	
}

module.exports = Round
