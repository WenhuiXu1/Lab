const db = require('../db/db')

const Comment = {
  findAll: () => {
    const sql = 'SELECT * FROM comments'

    return db
      .query(sql)
      .then(dbRes => dbRes.rows)
  },

  create: (depot_id, user_id, comment) => {
    const sql = `
      INSERT INTO comments(depot_id, user_id, comment)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    return db
      .query(sql, [depot_id, user_id, comment])
      .then(dbRes => dbRes.rows[0])
  },

  update: (comment, commentId) => {
    const sql = `
      UPDATE comments SET comment = $1 WHERE id = $2
      RETURNING *
    `

    return db
      .query(sql, [comment, commentId])
      .then(dbRes => dbRes.rows[0])
  },

  delete: (commentId) => {
    const sql = 'DELETE FROM comments WHERE id = $1'

    return db.query(sql, [commentId])
  }
}

module.exports = Comment