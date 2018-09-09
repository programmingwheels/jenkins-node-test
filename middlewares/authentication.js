const rp= require('request-promise');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
async function validateFacebookToken(req, res, next){
  try{
   let token= req.query.access_token;
   const profileDetails= await rp(process.env.FACEBOOK_ME_URL+token)
   req.FBprofileDetails = profileDetails;
   next();
  }catch(err){
    next(err);
  }
}

function verifyToken(token){
  return new Promise((resolve,reject)=>{
    jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
      if(err)
        reject(err)
      resolve(decoded);  
    })
  })
}
async function validateJWT (req, res, next) {
  try{
    const decoded = await verifyToken(req.headers["x-access-token"]);
    req.userId= decoded;
    next();
  }catch(err){
    console.log(err);
    res.status(400).json({message:'Access Denied'});
  }
  
}
module.exports={
    validateFacebookToken,
    validateJWT
}