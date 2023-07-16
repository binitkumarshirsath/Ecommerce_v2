import Product from "../../model/productModel.js";

export default async function similarProductController(req,res){
    try{
        const{pid,cid} = req.params;
        const data = await Product.find({category : cid , _id : {$ne:pid}}).select("-photo");
        return res.status(200).json({success : true, data , total : data.length});
    }catch(error){
        console.log(error);
        return res.status(500).json({success: false , message : "Error while getting similar products",error})
    }
}