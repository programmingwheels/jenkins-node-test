'use strict';
require('dotenv').config();
const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidation = require('express-validation');
const morgan = require('morgan');
const loadSwaggerSpec = require('./swagger');
const authRoute = require('./routes/auth_routes');
const profileRoute = require('./routes/profile');
const passport = require('passport')
Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error',()=>{
   throw new Error(`unable to connect to database: ${process.env.MONGO_URI}`);
})
mongoose.connection.once('open',()=>{
    console.log("Connected to db");
})
//app.use(morgan('tiny', { stream: logger.stream }));
const passportConfig = require('./middlewares/passport');
passportConfig();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(cors());
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/profile',profileRoute);
loadSwaggerSpec(app);
app.use(function(err, req, res, next){
    // default error handler. This will catch all the express-validation error message and pass it to the response.
    if(err instanceof expressValidation.ValidationError)
        return res.status(400).json(err)
    else{
      // if it is not express validation error , then it will be logged and will send response status 500
        return res.status(500).json(err)
    }
  
  });
module.exports = app;