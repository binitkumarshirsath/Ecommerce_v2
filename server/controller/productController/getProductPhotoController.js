import Product from "../../model/productModel.js";

export default async function getProductPhotoController(req, res) {
  try {
    const { pid } = req.params;
    const product = await Product.findById({ _id: pid }).select("photo");

    if (product && product.photo && product.photo.data) {
      res.set('Content-Type', product.photo.contentType);
      return res.send(product.photo.data);
    } else {
      return res.status(404).send('Photo not found');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
}
