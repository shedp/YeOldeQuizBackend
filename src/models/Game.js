const db = require("../db/init")
const Round = require("./Round")
const Score = require("./Score")
const randomString = require("randomstring")

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
				const response = await db.query("SELECT * FROM games WHERE creator_id = $1;", [id])
				const games = response.rows.map((g) => new Game(g))
				resolve(games)
			} catch (err) {
				console.log(err)
				reject("games not found")
			}
		})
	}

	//get game by game_id
	static async findByGameId(id) {
		return new Promise(async (resolve, reject) => {
			try {
				let gameData = await db.query(
					"SELECT * FROM games WHERE game_id = $1;",
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
				const join_code = randomString.generate({length: 8, capitalization: "uppercase"}); // find npm package to create a code
				const result = await db.query(
					"INSERT INTO games (creator_id, level, join_code) VALUES ($1, $2, $3) RETURNING *;",
					[user_id, level, join_code]
				)
				let newGame = new Game(result.rows[0])
				await Promise.all(topics.map(topic => newGame.createRounds(topic, user_id)))
                resolve(newGame)
            } catch (err) {
                reject("Could not create game")
                console.log(err)
            }
        })
    }

	static async update(id, activeStatus){
		return new Promise(async(resolve, reject) => {
			try{
				const result = await db.query("UPDATE games SET active = $1 WHERE game_id = $2 RETURNING *", [activeStatus, id])
				resolve(result.rows[0])
			} catch (err){
				reject("could not update game")
			}
		})
	}

	//destroy game
	destroy() {
		return new Promise(async (resolve, reject) => {
			try {
				// delete scores
				const result = await db.query("DELETE FROM scores WHERE game_id IN ($1)", [this.game_id])
				// delete rounds
				const result1 = await db.query("DELETE FROM rounds WHERE game_id IN ($1)", [this.game_id])

				const result3 = await db.query("DELETE FROM games WHERE game_id = $1", [this.game_id])

				resolve("Game was destroyed")
			} catch (err) {
				console.log(err)
				reject("Could not destroy Game")
			}
		})
	}

	//create rounds after creating game
	async createRounds(topic, user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                await Round.create(user_id, this.game_id, topic)
                resolve("rounds added")
            } catch (err) {
                reject("Could not add rounds")
                console.log(err)
            }
        })
    }
}

module.exports = Game
