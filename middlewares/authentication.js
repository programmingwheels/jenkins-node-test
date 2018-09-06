const rp= require('request-promise')
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
module.exports={
    validateFacebookToken
}