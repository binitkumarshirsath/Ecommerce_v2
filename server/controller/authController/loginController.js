import User from "../../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(200).json({ success: false, message: "Empty Fields found" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "User not registered!" , navigate : true });
    }
    const token = await jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (result === true) {
        return res.status(200).json({
          success: true,
          message: "User Logged in",
          user: {
            _id : existingUser._id,
            name : existingUser.name,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
          },
          token: token,
        });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Wrong password entered" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error,
      message: "Error in login",
    });
  }
};

export default loginController;
