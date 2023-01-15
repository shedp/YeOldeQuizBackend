const fs = require('fs')
require('dotenv').config();

const db = require('./init')


const seeds = fs.readFileSync('./db/seedAppDB.sql').toString()

db.query(seeds).then(data => console.log("SQL database set-up complete :)")).catch(error => console.log(error))
