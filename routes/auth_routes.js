const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');
const authValidate = require('../validations/auth.validate');
const expressValidation = require('express-validation');
const middleware = require('../middlewares/authentication');


route.post('/register',expressValidation(authValidate.register), userController.register);
route.post('/verify-email',expressValidation(authValidate.verifyEmail),userController.verifyEmail);
route.post('/login',expressValidation(authValidate.login), userController.login);
route.get('/facebook',middleware.validateFacebookToken,userController.generateJWT);
route.post('/forgot-password',expressValidation(authValidate.forgotPassword),userController.forgotPassword);
route.post('/change-forgot-password',expressValidation(authValidate.changeForgotPassword),userController.changeForgotPassword);

module.exports=route;