const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @route GET /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search

  let users
  if (searchString) {
    users = await User.find({
      email: { $regex: searchString, $options: 'i' }
    })
  }

  if (users) {
    return res.status(200).json({ success: true, users: users })
  }
  res.status(404)
  throw new Error('No users found in search')
})

// @route GET /users/fetch/all-users
// @desc fetch all users in the database
// @access Private

exports.fetchAllUser = asyncHandler(async (req, res, next) => {
  const users = await User.find(
    {},
    { username: 1, email: 1, occupation: 1, company: 1 }
  )

  if (users) {
    return res.status(200).json({ success: true, users })
  }
  res.status(500)
  throw new Error('something went wrong')
})
