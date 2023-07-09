import slugify from "slugify";
import Category from "../../model/categoryModel.js";

export default async function updateCategoryController(req, res) {
  try {
    const { name } = req.body;
    const { id } = req.params;
    
    if (!name) {
      return res.status(200).json({ success: false, message: "name required" });
    }
    const categoryToUpdate = await Category.findById({  _id : id });
    if (!categoryToUpdate) {
      return res
        .status(200)
        .json({ success: false, message: "Cant find the category" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "Category updated successfully",
        updatedCategory,
      });
  } catch (error) {
    return res
      .status(200)
      .json({ success: false, message: "error in updation", error });
  }
}
