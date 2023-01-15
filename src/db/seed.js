const fs = require('fs')
require('dotenv').config();

const db = require('./init')

const seeds = fs.readFileSync('./db/seedHabits.sql').toString()

db.query(seeds).then(data => console.log("Set-up complete")).catch(error => console.log(error))
