const express = require('express')

// middlewares
const logger = require('./middlewares/logger')
const sessions = require('./middlewares/sessions')

// controllers
const depotsController = require('./controllers/depots_controller')
const usersConstroller = require('./controllers/users_controller')
const sessionsController = require('./controllers/sessions_controller')

const app = express()
const port = process.env.PORT || 3001;

// start the web server
app.listen(port, () => console.log(`listening on http://localhost:${port}`))



// middleware to send back our SPA (Single-Page Application)
app.use(sessions)
app.use(express.static('client'))
app.use(express.json())


// middleware function to log request info in the terminal
app.use(logger)
app.use('/api/depots', depotsController)
// app.use('/api/sessions', sessionsController)
// app.use('/api/users', usersConstroller)