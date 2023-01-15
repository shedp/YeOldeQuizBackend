const db = require("../db/init")
const Round = require("./Rounds")
const Score = require("./Scores")

class Game {
	constructor(data) {
		this.game_id = data.game_id
		this.user_id = data.user_id
		this.level = data.level
		this.join_code = data.join_code
		this.topics = data.topics //topics = [topic1, topic2, topic3]
	}

	//get all games
	static async all(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await db.query("SELECT * FROM games WHERE user_id = $1", [id])
				const games = response.rows.map((g) => new Game(g))
				resolve(games)
			} catch (err) {
				reject("games not found")
			}
		})
	}

	//get game by game_id
	static async findByGameId(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let gameData = await db.query(
					"SELECT * FROM games WHERE games_id = $1;",
					[id] 
				)
				let game = new Game(gameData.rows[0])
				resolve(game)
			} catch (err) {
				reject("Game not found")
				console.log(err)
			}
		})
	}

	//create game
	static async create(gameData) {
		return new Promise(async (resolve, reject) => {
			try {
				const {
					user_id,
					level,
					topics
				} = gameData
				const join_code = ""; // find npm package to create a code
				const result = await db.query(
					"INSERT INTO games (user_id, level, join_code) VALUES ($1, $2, $3) RETURNING *",
					[user_id, level, join_code]
				)
				let newGame = new Game(result.rows[0])
				await Promise.all(topics.map(topic => this.createRounds(topic)))
                resolve(newGame)
            } catch (err) {
                reject("Could not create game")
                console.log(err)
            }
        })
    }

	//destroy game
	destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				// delete scores
				const result = await Score.destroy()
				// delete rounds
				const result1 = await Round.destroy()

				resolve("Game was destroyed")
			} catch (err) {
				reject("Could not destroy Game")
			}
		})
	}

	//create rounds after creating game
	async createRounds(topic) {
        return new Promise(async (resolve, reject) => {
            try {
                await Round.create(this.game_id, topic)
                resolve("rounds added")
            } catch (err) {
                reject("Could not add rounds")
                console.log(err)
            }
        })
    }
}

module.exports = Game
