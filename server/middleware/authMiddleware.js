import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const requireSignIn = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, error, message: "Error in Require Sign in" });
  }
};

const isAdmin = async(req, res, next) => {
  const email = req.user.email;
  console.log(req.user);
  
  const user = await User.findById({_id:req.user._id});
  // console.log(user.isAdmin);
  if (!user.isAdmin) {
    return res.status(401).json({ success: false, msg: "Unauthorized Access" });
  } else {
    next();
  }
};
export { requireSignIn, isAdmin };
