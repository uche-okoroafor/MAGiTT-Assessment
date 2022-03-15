const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  accountHandler: {
    username: { type: String },
    userId: { type: String }
  },
  email: {
    type: String,
    unique: true
  },
  contact: {
    type: String
  },
  address: {
    type: String
  },

  location: {
    type: String
  },
  connections: { type: Schema.Types.Array, ref: 'connections' },
  users: { type: Schema.Types.Array, ref: 'members' },
  connectionRequests: { type: Schema.Types.Array, ref: 'connectionRequests' },

  register_date: {
    type: Date,
    default: Date.now
  }
})

const Company = mongoose.model('company', companySchema)
module.exports = Company
