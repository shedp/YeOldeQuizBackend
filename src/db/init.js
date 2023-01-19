const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DB_URL || 'postgres://xcjbolhg:bzzwq9voNzITxRM6G9uoMi3ujyghsStU@snuffleupagus.db.elephantsql.com/xcjbolhg' // test db
});

console.log("DB connection established")

module.exports = pool;