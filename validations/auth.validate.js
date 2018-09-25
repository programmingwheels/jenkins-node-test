const Joi = require('joi')

module.exports= {
  // POST /api/v1/register
  register: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(10),
      name:Joi.string().required(),
      phone:Joi.string(),
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
  },
  forgotPassword: {
    body: {
      email: Joi.string().email().required()
    }
  },
  changeForgotPassword: {
    body: {
      code: Joi.string().required(),
      password:Joi.string().required()
    }
  }
};