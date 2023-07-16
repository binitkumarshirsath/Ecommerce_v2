import Product from "../../model/productModel.js";
import Category from "../../model/categoryModel.js";

export default async function getProductbyCategory(req,res){
   try{
    const {slug} = req.params;
    const category = await Category.findOne({slug});
    const product = await Product.find({category}).select("-photo");
    return res.status(200).json({success : true,product});
   }catch(error){
    console.log(error);
   }
    
}