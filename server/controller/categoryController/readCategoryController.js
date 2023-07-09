import Category from "../../model/categoryModel.js";
//reads sinle category
export default async function readCategoryController(req,res){
    try {
        const {slug} = req.params;
        const data = await Category.findOne({slug});
        if(data)
            return res.status(200).json({success : true ,data})
        else
            return res.status(200).json({success : false , message : "Category not found"});    
    } catch (error) {
        return res.status(400).json({success:false,message : "error in reading category" , error})
    }
}