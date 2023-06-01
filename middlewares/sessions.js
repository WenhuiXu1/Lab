const session = require('express-session')

module.exports = session({
  key: 'user_sid',
  secret: "test",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
})