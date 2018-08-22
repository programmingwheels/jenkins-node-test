const Users = require('../models/user');
const emailService = require('../services/email');
const uuid = require('uuid/v4');
const Verify = require('../models/verifycode');
const jwt  = require('jsonwebtoken');
async function register(req,res) {
  let userCount= await Users.count({phone:req.body.phone})
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
module.exports={
    register,
    verifyEmail,
    login
}