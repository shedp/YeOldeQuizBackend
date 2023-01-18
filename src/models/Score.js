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

	//get scores by Score_id
	static findByScoreId(id){
		return new Promise(async (resolve, reject) => {
			try {
				const response = await db.query("SELECT * FROM scores where score_id = $1;")
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
				console.log(err)
				reject("Scores not found")
			}
		})
	}

	//get scores by game_id
	static findByGameId(id){
		return new Promise(async (resolve, reject) => {
			try {
				"SELECT * FROM scores WHERE score_id = $1;",
					[id] 
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
				// console.log(game_id, round_id, user_id)
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

	static findByRoundId(round_id){
		return new Promise(async (resolve, reject) => {
			try{
				let scoreData = await db.query(`SELECT * FROM scores WHERE round_id = $1;`, [round_id])
				let foundScore = new Score(scoreData.rows[0])
				resolve(foundScore);
			}catch(err){
				reject("could not find a score with both that game and round id")
			}
		})
	}

	//update score
	static update(score, id) {
		return new Promise(async (resolve, reject) => {
			try {
				
				let result = await db.query(
					"UPDATE scores SET score = $1 WHERE round_id = $2 RETURNING *;",
					[score, id]
				)
				console.log(result.rows[0])
				resolve(result.rows[0])
			} catch (err) {
				console.log(err)
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
