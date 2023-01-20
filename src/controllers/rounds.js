const Round = require("../models/Round");

async function create(req, res) {
  try {
    const round = await Round.create(req.body);
    res.status(201).json(round);
  } catch (err) {
    res.status(422).json({ err });
  }
}

async function index(req, res){
    try{
        const rounds = await Round.all;
        res.status(200).json(scores);
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = { create, index };

