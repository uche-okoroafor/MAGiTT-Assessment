const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const { searchUsers, fetchAllUser } = require('../controllers/user')

router.route('/').get(protect, searchUsers)
router.route('/fetch/all-users').get(protect, fetchAllUser)

module.exports = router
