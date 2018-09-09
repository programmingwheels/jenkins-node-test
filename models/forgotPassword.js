const mongoose = require('mongoose')
const forgotPasswordcodeSchema = new mongoose.Schema({
  code:{type:String,required:true},
  status:{type:Boolean,default:false},
  userId:{type:mongoose.Schema.ObjectId}
},{timestamps:true})
module.exports= mongoose.model('Forgotpasswordcode',forgotPasswordcodeSchema);