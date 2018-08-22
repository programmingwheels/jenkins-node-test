const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
  firstname:{type:String,required:true},
  lastname :{type:String,required:true},
  email :{type:String,required:true},
  phone :{type:String,required:true},
  password:{type:String,required:true},
  verifyStatus:{type:Boolean,default:false},
  activeStatus:{type:Boolean,default:false},
  gender:{type:String},
  topics:[mongoose.Schema.ObjectId]
},{timestamps:true})

userSchema.methods.HashPassword = (password)=>{
   return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password,this.password);
}


module.exports= mongoose.model('User',userSchema);