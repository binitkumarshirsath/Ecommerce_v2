import Product from "../../model/productModel.js";

export default async function getProductController(req,res){
    try {
        const products = await Product.find({}).select("-photo").populate('category').limit(16).sort({createdAt : -1});
        return res.status(200).json({success : true , products});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , error});
    }
}