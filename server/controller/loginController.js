import bcyrpt from "bcrypt";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, msg: "Empty Fields found" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User not registered!" });
    }
    const token = await jwt.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    bcyrpt.compare(password, existingUser.password, function (err, result) {
      if (result === true) {
        return res.status(200).json({
          success: true,
          msg: "User Logged in",
          user: {
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
          },
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, msg: "Password doesnt match" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      error,
      msg: "Error in login",
    });
  }
};

export default loginController;
