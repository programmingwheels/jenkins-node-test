const Joi = require('joi');
module.exports = {
    updateProfile: {
        body: {
          firstname:Joi.string().required(),
          lastname:Joi.string().required(),
          phone:Joi.string(),
          about:Joi.string(),
          location:Joi.string(),
          gender:Joi.string()

        }
    },
    changePassword:{
      body:{
        old_password: Joi.string().required().min(6).max(10),
        new_password: Joi.string().required().min(6).max(10)
      }
    }
}