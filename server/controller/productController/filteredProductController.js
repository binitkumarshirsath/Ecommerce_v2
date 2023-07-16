import Product from "../../model/productModel.js";

export default async function filteredProductController(req, res) {
  try {
    const { checked, radio } = req.body;

    let args = {};

    if (checked?.length) {
      args.category = { $in: checked };
    }

    if (radio?.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const filteredProduct = await Product.find(args);

    return res.status(200).json({
      success: true,
      filteredProduct,
      total: filteredProduct.length
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
