const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/category.controller');
const resourceValidate = require('../validations/resource.validate');
const middleware = require('../middlewares/authentication');
const expressValidation = require('express-validation');
//route.use(middleware.validateJWT);

route.post('/category',expressValidation(resourceValidate.createCategory), categoryController.createCategory);
route.put('/category/:category_id',expressValidation(resourceValidate.createCategory), categoryController.updateCategory);
route.delete('/category/:category_id',categoryController.deleteCategory);
route.get('/category',categoryController.getCategories);
route.post('/sub-category/:category_id',expressValidation(resourceValidate.createSubCategory), categoryController.createSubCategory);
module.exports=route;