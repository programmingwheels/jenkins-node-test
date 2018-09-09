const Users = require('../models/user');
const emailService = require('../services/email');
const uuid = require('uuid/v4');
const Verify = require('../models/verifycode');
const jwt  = require('jsonwebtoken');
async function register(req,res) {
  let userCount= await Users.count({email:req.body.email})
  if(userCount){
      return res.status(400).json({message:'User with same email id already exists'});
  }
  const user = new Users({
      firstname:req.body.firstname,
      lastname: req.body.lastname,
      email:req.body.email,
      phone:req.body.phone
  })
  user.password = user.HashPassword(req.body.password);
  await user.save()
  let code = uuid()
  const ver = new Verify({
      code:code,
      userId:user.id
  })
  await ver.save()
  await emailService.sendMail(req.body.email,"Email verification",code)
  return res.json({success:true});
}

async function verifyEmail(req, res){
    let verify_details = await Verify.findOne({code:req.body.code,status:false});
    console.log(verify_details.userId);
    
    if(!verify_details){
        return res.status(400).json({message:'Invalid code'})
    }
    verify_details.status=true;
    await verify_details.save()
    const user = await Users.findById(verify_details.userId);
    user.verifyStatus=true;
    user.activeStatus=true;
    await user.save();
    return res.json({success:true});
    
}

async function login (req,res){
   let user= await Users.findOne({email:req.body.email})
   if(!user){
       return res.status(400).json({message:'user doesnt exists'})
   }

   let status=user.validatePassword(req.body.password);
   if(!status){
    return res.status(400).json({message:'password doesnt match'})
   }
   const token = jwt.sign(user.id, process.env.JWT_SECRET);
   return res.json({token:token});
}
async function generateJWT (req, res, next){
  const fb = req.FBprofileDetails
 try{
    const user = await Users.findOne({"facebook_id":fb.id});
  if(!user){
       const u=new Users({
          email:fb.email,
          firstname:fb.first_name,
          lastname:fb.name
       })
     const us= await u.save();
     return res.json({token:jwt.sign(us.id, process.env.JWT_SECRET)});
  }
   return res.json({token:jwt.sign(user.id, process.env.JWT_SECRET)});
 }
 catch(error){
     next(error);
 }
  
}
async function forgotPassword (req, res, next) {
    const user = await Users.findOne({email: req.body.email});
    if(!user){
      return res.status(400).json({message:'User doesnt exists'});
    }
    let code = uuid()
    const ver = new Verify({
        code:code,
        userId:user.id
    })
    await ver.save()
    let forgotPasswordLink = process.env.HOST+`/forgot-password/${code}`
    await emailService.sendMail(req.body.email,"Forgot Password",forgotPasswordLink)
    return res.json({success:true});
}
async function changeForgotPassword (req, res, next){
    let verify_details = await Verify.findOne({code:req.body.code,status:false});
    if(!verify_details){
        return res.status(400).json({message:'Invalid code'})
    }
    const user = await Users.findById(verify_details.userId);
    user.password = user.HashPassword(req.body.password);
    await user.save();
    return res.json({success:true});
}

async function updateProfile (req, res, next) {
  let userId= req.userId;
  try{
    const user = await Users.update({id:userId},req.body);
    console.log(user);
    res.json({message:true});
  }catch(err){
    res.status(400).json(err);
  }
  
};

async function changePassword (req, res, next) {
    let user= await Users.findOne({_id:req.userId})
    if(!user){
        return res.status(400).json({message:'user doesnt exists'})
    }
 
    let status=user.validatePassword(req.body.old_password);
    if(!status){
     return res.status(400).json({message:'Wrong Password'})
    }
    user.password = user.HashPassword(req.body.new_password);
    await user.save();
    return res.json({message:true});
}
module.exports={
    register,
    verifyEmail,
    login,
    generateJWT,
    forgotPassword,
    changeForgotPassword,
    updateProfile,
    changePassword
}