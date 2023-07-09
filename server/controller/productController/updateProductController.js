import Product from "../../model/productModel.js";
import slugify from "slugify";
import fs from 'fs';
export default async function updateProductController(req, res) {
  try {
    const { name, description, price, category, isShipping, quantity } =
      req.fields;
    const { photo } = req.files;
    if (!name || !description || !price || !category || !photo || !quantity) {
      return res
        .status(200)
        .json({ success: false, message: "Empty fields found" });
    }

    if (photo.size > 100000) {
      return res
        .status(200)
        .json({ success: false, message: "Photo size limit crossed" });
    }

    
    const {pid} = req.params;
    const newProduct = await Product.findByIdAndUpdate({_id : pid},{...req.fields,slug : slugify(name)},{new:true})

    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();
    return res.status(200).json({success : true , message : "Product update successfull",newProduct})

  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Error in updation of Product", e });
  }
}
