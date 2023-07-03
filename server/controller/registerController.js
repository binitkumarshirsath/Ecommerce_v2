import bcrypt from "bcrypt";
import User from "../model/userModel.js";

const registerController = async(req,res)=>{
    const saltRound = 10;
    const { email, name, password , answer} = req.body;
    if (!email || !name || !password || !answer) {
      return res
        .status(200)
        .json({ success: false, message: "Empty fields found" });
    }
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(200)
          .json({ message: "User Already Exists", success: false });
      }
      bcrypt.hash(password, saltRound, function (err, hash) {
        if (err) {
          console.log(err);
          return res
            .status(200)
            .json({ success: false, message: "Error in Bcyrpt" });
        }
  
        const newUser = new User({
          name,
          email,
          password: hash,
          answer : answer.toLowerCase(),
        });
        newUser.save();
        return res
          .status(200)
          .json({ message: "User Registration successful", success: true });
      });
    } catch (error) {
      console.log(error);
    }
  }

export default registerController;

