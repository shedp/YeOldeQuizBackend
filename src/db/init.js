const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DB_URL || 'postgres://hcwhtede:J7a8uihmawGG1D7xyzruhmOrbpjQ2C3f@mouse.db.elephantsql.com/hcwhtede' // test db
});

console.log("DB connection established")

module.exports = pool;
