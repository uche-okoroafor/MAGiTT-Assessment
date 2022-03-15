const Company = require('../models/Company')

// @desc "checkAccountHandler" checks if the request sent is from the company account handler,
//@desc the request  will be rejected if the check fails
// @access Private

const checkAccountHandler = async (loggedInUserId, companyId) => {
  const handler = await Company.findOne(
    {
      _id: companyId
    },
    { accountHandler: 1, _id: 0 }
  )
  if (handler.accountHandler.userId === loggedInUserId) {
    return true
  }
  return false
}

module.exports = checkAccountHandler
