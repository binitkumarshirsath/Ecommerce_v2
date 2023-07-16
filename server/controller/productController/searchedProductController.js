import Product from "../../model/productModel.js";

export default async function searchedProductController(req, res) {
  const { keywords } = req.params;
  try {
    const regex = new RegExp(keywords, "i");
    const product = await Product.find({
      $or: [{ name: regex }, { description: regex }],
    }).select("-photo");
    return res
      .status(200)
      .json({ success: true, product, messag: "Searched product fetched" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in search", error });
  }
}
