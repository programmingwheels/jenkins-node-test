const Joi = require('joi')

module.exports= {
  // POST /api/v1/register
  register: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(10),
      firstname:Joi.string().required(),
      lastname:Joi.string().required(),
      phone:Joi.string().required(),
    }
  },
  verifyEmail: {
    body: {
      code: Joi.string().required()
    }
  },


  // POST /api/v1/login
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
};