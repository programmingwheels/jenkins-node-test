const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');
const authValidate = require('../validations/auth.validate');
const expressValidation = require('express-validation');


route.post('/register',expressValidation(authValidate.register), userController.register);
route.post('/verify-email',expressValidation(authValidate.verifyEmail),userController.verifyEmail);
route.post('/login',expressValidation(authValidate.login), userController.login);

module.exports=route;