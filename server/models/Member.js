const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  occupation: { type: String }
})

const Member = mongoose.model('members', memberSchema)
module.exports = Member
