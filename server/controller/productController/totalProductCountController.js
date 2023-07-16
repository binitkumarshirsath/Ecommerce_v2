import Product from "../../model/productModel.js";

export default async function totalProductCountController(req,res) {
  try {
    const totalProduct = await Product.find({}).estimatedDocumentCount();
    return res.status(200).json({success : true,totalProduct}); 
  } catch (e) {
    console.log(e);
    return res.status(500).json({success :false , message :"Error while getting count",e});
  }
}
