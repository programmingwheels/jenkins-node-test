const Joi = require('joi');
module.exports = {
    createCategory: {
        body: {
          category_name:Joi.string().required(),
          category_tag:Joi.string().required(),
          category_icon:Joi.string()

        }
    },
    createSubCategory:{
      body: {
        sub_category_name:Joi.string().required(),
        sub_category_tag:Joi.string().required(),
        sub_category_icon:Joi.string()

      }
    }
}