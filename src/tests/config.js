const request = require('supertest')
const fs = require('fs')
const { Pool } = require('pg')
// const app = require('../server_socket')
const {server} = require('../app')
const testSeed = fs.readFileSync(__dirname + '/testSeed.sql').toString();

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try{
            const db = new Pool({ connectionString: 'postgres://xcjbolhg:bzzwq9voNzITxRM6G9uoMi3ujyghsStU@snuffleupagus.db.elephantsql.com/xcjbolhg'});
            await db.query(testSeed);
            resolve('Test DB reset successfully')
        } catch (err){
            reject(`Test DB not reset: ${err}`)
        }
    })
}

global.request = request;
global.app = server;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;