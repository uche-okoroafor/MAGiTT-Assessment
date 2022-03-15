const Company = require('../models/Company')
const ConnectionRequest = require('../models/ConnectionRequest')
const User = require('../models/User')
const Connection = require('../models/Connection')
const Member = require('../models/Member')
const asyncHandler = require('express-async-handler')
const e = require('express')
const ObjectID = require('mongodb').ObjectID
const checkAccountHandler = require('../validator/validateAccountHandler')

// @route POST /create/company
// @desc create company profile
// @access Private
exports.createCompanyProfile = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const {
    companyName,
    username,
    address,
    email,
    contact,
    location,
    accountType
  } = req.body

  const companyData = await Company.create({
    companyName,
    address,
    email,
    contact,
    location,
    accountType,
    accountHandler: {
      username,
      userId: loggedInUserId
    }
  })
  if (companyData) {
    const user = await User.updateOne(
      { _id: loggedInUserId },
      {
        $set: {
          createdCompanyId: companyData._id
        }
      }
    )
    if (user.nModified === 1) {
      return res.status(200).json({ success: true, companyData })
    }
  }

  res.status(500)
  throw new Error('Unable to perform this operation.please,try again later')
})

// @route GET /fetch/companies
// @desc fetch all the companies from database
// @access Private

exports.fetchAllCompany = asyncHandler(async (req, res, next) => {
  const allCompany = await Company.find(
    {},
    { companyName: 1, location: 1, email: 1, contact: 1, address: 1 }
  )

  if (allCompany) {
    return res.status(200).json({ success: true, allCompany })
  }
  res.status(500)
  throw new Error('Unable to perform this operation.please,try again later')
})

// @route GET /fetch/data/:companyId
// @desc fetch  a company data from the database
// @access Private

exports.fetchCompanyData = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params

  const companyData = await Company.findById(companyId)

  if (companyData) {
    return res.status(200).json({ success: true, companyData })
  }
  res.status(500)
  throw new Error('Unable to perform this operation.please,try again later')
})

// @route PATCH /request/connection
// @desc add request to company connection request
// @access Private

exports.sendConnectionRequest = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const {
    requesterName,
    requesterId,
    requesterAddress,
    requesterLocation,
    recipientName,
    recipientId,
    recipientAddress,
    recipientLocation
  } = req.body

  // first check if logged in user is the account handler,access is denied if it fails

  const validateAccountHandler = await checkAccountHandler(
    loggedInUserId,
    requesterId
  )

  if (!validateAccountHandler) {
    res.status(401)
    throw new Error(
      'Only the company account handler is allowed to perform this operation'
    )
  }

  // first check if connect request exist on the company connection request

  const checkConnectExists = await Company.findOne({
    _id: recipientId,
    'connections.companyId': requesterId
  })

  if (checkConnectExists) {
    return res
      .status(409)
      .json({ success: false, error: 'Connection request Already sent' })
  }

  const request = new ConnectionRequest({
    requesterName,
    requesterId,
    requesterAddress,
    requesterLocation,
    recipientName,
    recipientId,
    recipientAddress,
    recipientLocation
  })

  const updateRecipientCompany = await Company.updateOne(
    { _id: recipientId },
    {
      $push: {
        connectionRequests: [request]
      }
    }
  )

  const updateRequesterCompany = await Company.updateOne(
    { _id: requesterId },
    {
      $push: {
        connectionRequests: [request]
      }
    }
  )

  if (
    updateRecipientCompany.nModified === 1 &&
    updateRequesterCompany.nModified === 1
  ) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('Unable to send a connection request.please,try again later')
})

// @route PATCH /accept/connection
// @desc accept connections request  by adding the request to company connections in the  database
// @access Private
exports.acceptConnectionRequest = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id

  const {
    requesterName,
    requesterId,
    requesterAddress,
    requesterLocation,
    recipientName,
    recipientId,
    recipientAddress,
    recipientLocation,
    requestId
  } = req.body

  // first check if logged in user is the account handler,access is denied if it fails

  const validateAccountHandler = await checkAccountHandler(
    loggedInUserId,
    recipientId
  )

  if (!validateAccountHandler) {
    res.status(401)
    throw new Error(
      'Only the company account handler is allowed to perform this operation'
    )
  }

  // "checkConnectionExists" checks if the connection already exist in the company connection
  const checkConnectionExists = await Company.findOne({
    _id: recipientId,
    'connections.companyId': requesterId
  })

  if (checkConnectionExists) {
    return res
      .status(409)
      .json({ success: false, error: 'Company Already Connected' })
  }

  const requestObjectId = ObjectID(requestId)
  const requesterConnection = new Connection({
    companyName: requesterName,
    companyId: requesterId,
    address: requesterAddress,
    location: requesterLocation
  })

  const recipientConnection = new Connection({
    companyName: recipientName,
    companyId: recipientId,
    address: recipientAddress,
    location: recipientLocation
  })
  recipientConnection._id = requesterConnection._id

  // delete the request from the connectionRequest of the company

  const deleteRequesterRequest = await Company.updateOne(
    { _id: recipientId },
    {
      $pull: {
        connectionRequests: { _id: requestObjectId }
      }
    }
  )

  if (deleteRequesterRequest.nModified !== 1) {
    res.status(404)
    throw new Error('Unable to perform this operation.please,try again later')
  }

  const deleteRecipientRequest = await Company.updateOne(
    { _id: requesterId },
    {
      $pull: {
        connectionRequests: { _id: requestObjectId }
      }
    }
  )

  if (deleteRecipientRequest.nModified === 1) {
    const addRequester = await Company.updateOne(
      { _id: recipientId },
      {
        $push: {
          connections: [requesterConnection]
        }
      }
    )
    if (addRequester.nModified !== 1) {
      res.status(404)
      throw new Error('Unable to perform this operation.please,try again later')
    }

    const addRecipient = await Company.updateOne(
      { _id: requesterId },
      {
        $push: {
          connections: [recipientConnection]
        }
      }
    )
    if (addRecipient.nModified === 1) {
      return res.status(200).json({ success: true })
    }
  }
  res.status(500)
  throw new Error('Unable to perform this operation.please,try again later')
})

// @route DELETE /reject/connection
// @desc delete request from company database
// @access Private
exports.rejectConnectionRequest = asyncHandler(async (req, res, next) => {
  const loggedInUserId = req.user.id
  const { requesterId, recipientId, requestId } = req.body

  // "validateRecipientAccountHandler" check if logged in user is the account handler,access is denied if it fails

  const validateRecipientAccountHandler = await checkAccountHandler(
    loggedInUserId,
    recipientId
  )

  // "validateRequesterAccountHandler" check if logged in user is the account handler,access is denied if it fails

  const validateRequesterAccountHandler = await checkAccountHandler(
    loggedInUserId,
    requesterId
  )
  if (!validateRecipientAccountHandler && !validateRequesterAccountHandler) {
    res.status(401)
    throw new Error(
      'Only the company account handler is allowed to perform this operation'
    )
  }

  const requestObjectId = ObjectID(requestId)

  const deleteRequesterRequest = await Company.updateOne(
    { _id: recipientId },
    {
      $pull: {
        connectionRequests: { _id: requestObjectId }
      }
    }
  )
  if (deleteRequesterRequest.nModified !== 1) {
    res.status(404)
    throw new Error('Unable to perform this operation.please,try again later')
  }

  const deleteRecipientRequest = await Company.updateOne(
    { _id: requesterId },
    {
      $pull: {
        connectionRequests: { _id: requestObjectId }
      }
    }
  )

  if (deleteRecipientRequest.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('Unable to perform this operation.please,try again later')
})

// @route DELETE /remove/connection
// @desc remove connected users from  the company  connection
// @access Private
exports.removeConnection = asyncHandler(async (req, res, next) => {
  const { companyId, connectedCompanyId, connectionId } = req.body
  const loggedInUserId = req.user.id

  // first check if logged in user is the account handler,access is denied if it fails

  const validateAccountHandler = await checkAccountHandler(
    loggedInUserId,
    companyId
  )

  if (!validateAccountHandler) {
    res.status(401)
    throw new Error(
      'Only the company account handler is allowed to perform this operation'
    )
  }

  const connectionObjectId = ObjectID(connectionId)

  const removeCompanyConnection = await Company.updateOne(
    { _id: companyId },
    {
      $pull: {
        connections: { _id: connectionObjectId }
      }
    }
  )
  if (removeCompanyConnection.nModified !== 1) {
    res.status(404)
    throw new Error('Unable to remove connection.please,try again later')
  }

  const removeConnectedCompanyConnection = await Company.updateOne(
    { _id: connectedCompanyId },
    {
      $pull: {
        connections: { _id: connectionObjectId }
      }
    }
  )
  if (removeConnectedCompanyConnection.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('Unable to remove connection.please,try again later')
})

// @route PATCH /add/user
// @desc add user to the company users
// @access Private

exports.addUserToCompany = asyncHandler(async (req, res, next) => {
  const {
    username,
    userId,
    occupation,
    email,
    companyName,
    companyId
  } = req.body
  const loggedInUserId = req.user.id

  // first check if logged in user is the account handler,access is denied if it fails

  const validateAccountHandler = await checkAccountHandler(
    loggedInUserId,
    companyId
  )
  if (!validateAccountHandler) {
    res.status(401)
    throw new Error(
      'Only the company account handler is allowed to perform this operation'
    )
  }

  // checks if the user already exist in the company users

  const companyInUser = await User.findOne(
    { _id: userId },
    { company: 1, _id: 0 }
  )
  if (companyInUser.company.companyName) {
    return res.status(409).json({
      success: false,
      error: ' This user has already  been added to a company'
    })
  }

  const userInCompanyList = await Company.findOne({
    _id: companyId,
    'users.userId': userId
  })
  if (userInCompanyList) {
    return res.status(409).json({ success: false, error: 'user already exist' })
  }

  const user = new Member({
    username,
    userId,
    occupation,
    email
  })

  const company = {
    companyName,
    companyId
  }

  const addUserToCompany = await Company.updateOne(
    { _id: companyId },
    {
      $push: {
        users: [user]
      }
    }
  )

  const addCompanyToUser = await User.updateOne(
    { _id: userId },
    {
      $set: {
        company: company
      }
    }
  )

  if (addUserToCompany.nModified === 1 && addCompanyToUser.nModified === 1) {
    return res.status(200).json({ success: true })
  }

  res.status(500)
  throw new Error('Unable to add user.please,try again later')
})

// @route DELETE /remove/user
// @desc remove user from the company  users
// @access Private

exports.removeUser = asyncHandler(async (req, res, next) => {
  const { companyId, userId } = req.body

  const userObjectId = ObjectID(userId)
  const loggedInUserId = req.user.id
  // first check if logged in user is the account handler,access is denied if it fails

  const validateAccountHandler = await checkAccountHandler(
    loggedInUserId,
    companyId
  )

  if (!validateAccountHandler) {
    res.status(401)
    throw new Error(
      'Only the company account handler is allowed to perform this operation'
    )
  }
  const removeUser = await Company.updateOne(
    { _id: companyId },
    {
      $pull: {
        users: { userId: userId }
      }
    }
  )
  if (removeUser.nModified !== 1) {
    res.status(404)
    throw new Error('Unable to remove user.please,try again later')
  }

  const removeCompanyFromUser = await User.updateOne(
    { _id: userId },
    {
      $set: {
        company: null
      }
    }
  )
  if (removeCompanyFromUser.nModified === 1) {
    return res.status(200).json({ success: true })
  }
  res.status(500)
  throw new Error('Unable to remove user.please,try again later')
})
