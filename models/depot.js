const db = require('../db/db')

const Depot = {
  findAll: () => {
    const sql = 'SELECT * FROM depots'

    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },

  // getDepotByPostcode: (postcode) => {
  //   const sql = 'SELECT * FROM depots where id = $1'

  //   return db
  //     .query(sql, [postcode])
  //     .then(dbRes => dbRes.rows)
  // } 
}

module.exports = Depot 