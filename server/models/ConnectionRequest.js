const mongoose = require('mongoose')

const connectionRequestsSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  requesterId: { type: String, required: true },
  requesterAddress: { type: String },
  requesterLocation: { type: String },
  recipientName: { type: String, required: true },
  recipientId: { type: String, required: true },
  recipientAddress: { type: String },
  recipientLocation: { type: String }
})

const ConnectionRequest = mongoose.model(
  'connectionRequests',
  connectionRequestsSchema
)
module.exports = ConnectionRequest
