const Session = require("../models/Session")

async function authenticator(req, res, next) {
	try {
		// Extract the token from the request
		const userToken = req.headers["authorization"]
		console.log("auth middleware: ", userToken)
		if (userToken == "null") {
			console.log(userToken)
			throw new Error("Missing token")
		} else {
			// Validate it
			const validToken = await Session.findBySessionToken(userToken)
			next()
		}
	} catch (err) {
		console.log(err)

		res.status(401).json({ error: "Invalid credentials" })
	}
}

module.exports = authenticator
