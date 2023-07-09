import Category from "../../model/categoryModel.js";

export default async function getAllCategoryController(req,res){
    try{
        const data = await Category.find({});
        if(!data){
            return res.status(200).json({success : false , message : "No categories found",data})
        }
        return res.status(200).json({success : true , data});
    }catch(e){
        return res.status(500).json({success : false ,message : "Error while reading categories ", e})
    }
}