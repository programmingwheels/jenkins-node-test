const mongoose = require('mongoose');
const subCategorySchema = new mongoose.Schema({
    sub_category_name : {type:String,required:true},
    sub_category_tag : {type:String,required:true},
    sub_category_icon : {type:String,required:true},
}) 
const categorySchema = new mongoose.Schema({
    category_name : {type:String,required:true},
    category_tag : {type:String,required:true},
    category_icon : {type:String,required:true},
    sub_categories :[subCategorySchema]
})
module.exports= mongoose.model('Category',categorySchema);