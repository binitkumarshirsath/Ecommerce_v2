import Category from "../../model/categoryModel.js";

export default async function deleteCategoryController(req,res){
    try {
        const {id} = req.params;
    const categoryToBeDeleted = await Category.findByIdAndDelete({_id:id});
    return res.status(200).json({success : true ,message : "Category deleted",categoryToBeDeleted});
    } catch (error) {
        return res.status(500).json({success : false ,message : "Error while deleting",error});
    }
}