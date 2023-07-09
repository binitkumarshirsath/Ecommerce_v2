import Category from "../../model/categoryModel.js";
import slugify from "slugify";

async function createCategoryController(req, res) {
  const { name } = req.body;
  
  try {
   
    if (!name) {
      return res
        .status(200)
        .json({ success: false, message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .json({ success: false, message: "Category already exists" });
    }

    const newCategory = await new Category({
      name,
      slug: slugify(name),
    }).save();

    return res.status(200).json({success : true, message : "Category added" , newCategory})
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }

}


export default createCategoryController;