import slugify from "slugify";
import Product from "../../model/productModel.js";
import fs from "fs";

export default async function createProductController(req, res) {
  try {
    const { name, description, price, category, isShipping , quantity } = req.fields;
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

    const product = new Product({
      ...req.fields,
      slug: slugify(name),
    })

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ success: false, message: "Error in product updation", e });
  }
}
