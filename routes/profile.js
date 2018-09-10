const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');
const profileValidate = require('../validations/profile.validate');
const middleware = require('../middlewares/authentication');
const expressValidation = require('express-validation');
route.use(middleware.validateJWT);

route.post('/update-profile',expressValidation(profileValidate.updateProfile), userController.updateProfile);
route.post('/change-password',expressValidation(profileValidate.changePassword),userController.changePassword);
route.get('/me',userController.getProfile);

module.exports=route;