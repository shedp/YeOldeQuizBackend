const bcrypt = require("bcrypt");
const User = require("../models/User");
const Session = require("../models/Session");

async function show(req, res) {
  try {
    const token = req.params.sessiontoken;
    const sesh = await Session.findBySessionToken(token);
    const user = await User.findById(sesh.user_id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

async function findUserId(req, res) {
  try {
    const token = req.params.sessiontoken;
    const sesh = await Session.findBySessionToken(token);
    res.status(200).send(`${sesh.user_id}`);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

async function showUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

async function register(req, res) {
  try {
    const data = req.body;

    // Generate a salt with a set time cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);

    // Send the username + password off to make a new user
    const result = await User.create(data);

    // Send it back
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

async function login(req, res) {
  try {
    // console.log(req.body)
    const { username, password } = req.body;

    // Try and get that user
    const user = await User.findByUsername(username);

    // Check if the password submitted is the correct one
    const authenticated = await bcrypt.compare(password, user.password);

    if (authenticated) {
      // If the password was correct

      // Generate a session for them
      const newSession = await Session.create(user.id);
      console.log(newSession);
      res
        .status(200)
        .json({ authenticated: true, session: newSession.session_token });
    } else {
      throw new Error("Incorrect credentials");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: err });
  }
}

async function logout(req, res) {
	try {
		const session = await Session.findBySessionToken(req.body.sessionToken);
		const resp = session.deleteSession();
		res.status(204).end();
	} catch (err) {
		console.log(err)
		res.status(404).json({err});
	}
}

async function update(req, res){
	try{
		const userToken = req.headers["authorization"];
    const sesh = await Session.findBySessionToken(userToken);
    const user = await User.updateHighScore(req.body.score, sesh.user_id);
		res.status(200).json(user)
	} catch(err){
		res.status(417).json(err)
	}
}
	

module.exports = {show, register, login, logout, showUser, update, findUserId };

