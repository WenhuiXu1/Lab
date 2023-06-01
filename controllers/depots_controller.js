const express = require('express')
const router = express.Router()

// models
const Depot = require('../models/depot')

// routes
router.get('/', (req, res) => {
  Depot
    .findAll()
    .then(depots => res.json(depots))
})

// router.getDepots('/:postcode', (req, res) => {
//   const postcode = req.params.postcode

//   Depot
//     .getDepotByPostcode(postcode)
//     .then(depot => res.json(depot))
// })

module.exports = router