import mongoose from "mongoose";

 async function  connectDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;