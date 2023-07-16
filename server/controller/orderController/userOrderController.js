import Order from "../../model/orderModel.js";
import Product from "../../model/productModel.js";
export default async function (req, res) {
  try {
    const order = await Order.find({ buyer: req.user._id })
      .select("-payment").select("-photo")
      .populate("products");
      console.log(order);
    return res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in getting orders ", error });
  }
}
