const { check, validationResult } = require('express-validator')

const handleParams = params => {
  return check(params, ` ${params} is not defined`)
    .not()
    .isEmpty()
}
const handleError = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

exports.validateCreateCompanyProfile = [
  handleParams('companyName'),
  handleParams('email'),
  handleParams('username'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateFetchCompanyData = [
  handleParams('companyId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateConnectionRequest = [
  handleParams('requesterName'),
  handleParams('requesterId'),
  handleParams('recipientName'),
  handleParams('recipientId'),

  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateRejectConnectionRequest = [
  handleParams('requesterId'),
  handleParams('recipientId'),
  handleParams('requestId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateAddUserToCompany = [
  handleParams('username'),
  handleParams('userId'),
  handleParams('companyName'),
  handleParams('companyId'),
  handleParams('email'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateRemoveConnection = [
  handleParams('connectedCompanyId'),
  handleParams('companyId'),
  handleParams('connectionId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]
exports.validateRemoveUser = [
  handleParams('companyId'),
  handleParams('userId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]
