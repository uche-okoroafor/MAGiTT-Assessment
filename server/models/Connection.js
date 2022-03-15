const mongoose = require('mongoose')

const connectionsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyId: { type: String, required: true },
  address: { type: String },
  location: { type: String }
})

const Connection = mongoose.model('connections', connectionsSchema)
module.exports = Connection
