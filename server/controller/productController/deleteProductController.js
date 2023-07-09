import Product from "../../model/productModel.js";

export default async function deleteProductController(req,res){
    try {
        const {pid} = req.params;
        await Product.findByIdAndDelete({_id : pid});
        return res.status(200).json({success : true ,message : "Product deleted"});
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({success : false ,error})
    }
}