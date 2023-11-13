const monk = require('monk');

const DB_URL = "mongodb://localhost:27017"

let dbUrl = DB_URL;

const db = monk(dbUrl);

module.exports = db;