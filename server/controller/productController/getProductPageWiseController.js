import Product from "../../model/productModel.js";

export default async function getProductPageWiseController(req, res) {
 try {
    
     const page = req.params.page ? req.params.page : 1;
     const perPage = 6;
     
     const product = await Product.find({})
       .select("-photo")
       .skip((page - 1) * perPage)
       .limit(perPage)
       .sort({createdAt : -1});
   
       return res.status(200).json({success : true,product});
 } catch (error) {
    console.log(error);
    return res.status(500).json({success : false ,error});
 }
}
