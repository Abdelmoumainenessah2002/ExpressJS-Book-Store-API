const express = require('express');
const { getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, resetPassword } = require('../controllers/passwordController');
const router = express.Router();


// /password/forgot-password
router.route('/forgot-password').get(getForgotPasswordView)
                                .post(sendForgotPasswordLink)
                                

// /password/reset-password/:userId/:token
router.route('/reset-password/:userId/:token').get(getResetPasswordView)
                                              .post(resetPassword)

module.exports = router;