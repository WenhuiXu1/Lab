const db = require('../db/db')

const Depot = {
  findAll: () => {
    const sql = 'SELECT * FROM depots'

    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },

  findDepotByDepotId: (depot_id) => {
    const sql = `SELECT * FROM depots WHERE depot_id = '$1'`

    return db
      .query(sql, [depot_id])
      .then(dbRes => dbRes.rows)
  }
}

module.exports = Depot 