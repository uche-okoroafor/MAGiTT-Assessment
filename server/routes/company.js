const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth')
const {
  validateCreateCompanyProfile,
  validateFetchCompanyData,
  validateConnectionRequest,
  validateRejectConnectionRequest,
  validateAddUserToCompany,
  validateRemoveConnection,
  validateRemoveUser
} = require('../validator/validateParams')
const {
  createCompanyProfile,
  fetchCompanyData,
  fetchAllCompany,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  addUserToCompany,
  removeConnection,
  removeUser
} = require('../controllers/company')

router
  .route('/create/profile')
  .post(protect, validateCreateCompanyProfile, createCompanyProfile)
router
  .route('/fetch/data/:companyId')
  .get(protect, validateFetchCompanyData, fetchCompanyData)
router.route('/fetch/companies').get(protect, fetchAllCompany)
router
  .route('/request/connection')
  .patch(protect, validateConnectionRequest, sendConnectionRequest)
router
  .route('/accept/connection')
  .patch(protect, validateConnectionRequest, acceptConnectionRequest)
router
  .route('/reject/connection')
  .delete(protect, validateRejectConnectionRequest, rejectConnectionRequest)
router
  .route('/remove/connection')
  .delete(protect, validateRemoveConnection, removeConnection)
router
  .route('/add/user')
  .patch(protect, validateAddUserToCompany, addUserToCompany)
router.route('/remove/user').delete(protect, validateRemoveUser, removeUser)

module.exports = router
