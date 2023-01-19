const Round = require("../models/Round");

async function create(req, res) {
  try {
    const round = await Round.create(req.body);
    res.status(201).json(round);
  } catch (err) {
    res.status(422).json({ err });
  }
}

module.exports = { create };

