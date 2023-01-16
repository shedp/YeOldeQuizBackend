const db = require("../db/init")

module.exports = class Score {
	constructor(data) {
		this.score_id = data.score_id
		this.score = data.score
		this.round_id = data.round_id
		this.game_id = data.game_id
		this.user_id = data.user_id
	}

	//get all scores
	static get all() {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await db.query("SELECT * FROM scores;")
				const scores = response.rows.map((s) => new Score(s))
				resolve(scores)
			} catch (err) {
				reject("Scores not found")
			}
		})
	}

	//get scores by user_id
	static findByUserId(id){
		return new Promise(async (resolve, reject) => {
			try {
				let scoreData = await db.query(
					`SELECT * FROM scores WHERE user_id = $1;`,
					[id]
				)
				let target = scoreData.rows.map(s => new Score(s))
				resolve(target)
			} catch (err) {
				reject("Scores not found")
			}
		})
	}

	//get scores by game_id
	static findByGameId(id){
		return new Promise(async (resolve, reject) => {
			try {
				let scoreData = await db.query(
					`SELECT * FROM scores WHERE game_id = $1;`,
					[id]
				)
				let target = scoreData.rows.map(s => new Score(s))
				resolve(target)
			} catch (err) {
				reject("Scores not found")
			}
		})
	}

	// create new score
	static create(game_id, round_id, user_id) {
		return new Promise(async (resolve, reject) => {
			try {
				// console.log(round_id, game_id, user_id)
				let scoreData = await db.query(
					`INSERT INTO scores (game_id, round_id, user_id) VALUES ($1, $2, $3) RETURNING *;`,
					[game_id, round_id, user_id]
				)
				// console.log(scoreData.rows[0])
				let newScore = new Score(scoreData.rows[0])
				// console.log("success")
				resolve(newScore)
			} catch (err) {
				console.log(err)
				reject("Score could not be created")
			}
		})
	}

	//update score
	static update(id, score) {
		return new Promise(async (resolve, reject) => {
			try {
				let result = await db.query(
					"UPDATE scores SET score = $1 RETURNING score_id;",
					[score]
				)
				let score = await Score.findById(result.rows[0].score_id)
				resolve(habit)
			} catch (err) {
				reject("Could not update score")
			}
		})
	}

	//destroy
	destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(this.game_id)
				const result = await db.query(
					"DELETE FROM scores WHERE game_id IN ($1)",
					[this.game_id]
				)
				resolve("score was destroyed")
			} catch (err) {
				reject("Could not destroy score")
			}
		})
	}
}
