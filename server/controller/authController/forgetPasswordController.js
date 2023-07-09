import User from "../../model/userModel.js";
import bcrypt from "bcrypt";

async function forgetpasswordController(req,res){
    const {email , answer , newPassword} = req.body;
    
    const saltRounds = 10;
    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(200).json({success : false , message : "Email is not registered"});
    }
    if(existingUser.answer !== answer.toLowerCase()){
        return res.status(200).json({success:false,message : "Wrong answer"});
    }
    else if(existingUser.answer === answer.toLowerCase()){

        bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(200).json({success: false, message: "Error in hashing"});
            }
            const updatedUser = await User.findByIdAndUpdate(existingUser._id, {password: hash});
            return res.status(200).json({success: true, message: "Password update successful"});
        });
    
    }

}

export default forgetpasswordController;