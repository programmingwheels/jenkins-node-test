const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
  name:{type:String,required:true},
  email :{type:String,required:true},
  phone :{type:String},
  password:{type:String},
  verifyStatus:{type:Boolean,default:false},
  activeStatus:{type:Boolean,default:false},
  gender:{type:String},
  topics:[mongoose.Schema.ObjectId],
  facebook_id:String,
  about:String,
  location:String,
},{timestamps:true})

userSchema.methods.HashPassword = (password)=>{
   return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password,this.password);
}


module.exports= mongoose.model('User',userSchema);