const Categories = require('../models/categories');
async function createCategory(req, res, next){
  try{
    const category = new Categories(req.body);
    const cat=await category.save();
    return res.json(cat);
  }catch(err){
    return res.status(400).json(err);
  }
  
}
async function getCategories (req, res, next) {
    try{
        const cat = await Categories.find({});
        return res.json(cat);
      }catch(err){
        return res.status(400).json(err);
      }
}
async function updateCategory (req, res, next) {
  try {
   await Categories.findByIdAndUpdate(req.params.category_id, req.body);
   const cat = await Categories.findById(req.params.category_id);
   return res.json(cat);
   return res.json(cat);
  }catch(err){
    return res.status(400).json(err);
  }
}
async function deleteCategory (req, res, next) {
  try {
    await Categories.findByIdAndRemove(req.params.category_id);
    return res.json({success:true});
   }catch(err){
    return res.status(400).json(err);
   }
}
async function createSubCategory (req, res, next) {
  
  try {
    const cat = await Categories.findById(req.params.category_id);
    cat.sub_categories.push(req.body);
    await cat.save(); 
    return res.json(cat);
   }catch(err){
    return res.status(400).json(err);
   }
}
module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    createSubCategory
}