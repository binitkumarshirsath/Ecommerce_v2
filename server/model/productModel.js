import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : true,
    },
    slug : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true  
    },
    quantity : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Category",
        required : true,
    },
    photo:{
        data : Buffer,
        contentType : String,
    },
    isShipping : {
        type : Boolean,
    }
},{timestamps:true})

const Product = mongoose.model('PRODUCT',ProductSchema);

export default Product;