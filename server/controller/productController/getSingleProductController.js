import Product from "../../model/productModel.js";

export default async function getSingleProductController(req,res){
    try{
        const {slug} = req.params;
        const product = await Product.findOne({slug : slug}).select("-photo").populate("category");
        return res.status(200).json({success : true, product});
    }catch(e){
        console.log(e);
        return res.status(500).json({success : false , e})
    }
}