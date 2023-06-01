const pg = require('pg')

let db
if (process.env.DB_PASSWORD) {
    db = new pg.Pool({
        database: "greenr_sa",
        password: process.env.DB_PASSWORD
    })
} else {
    db = new pg.Pool({
        database: "greenr_sa"
    })
}

module.exports = db