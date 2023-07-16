import User from "../../model/userModel.js";
import bcrypt from "bcrypt";

export default async function updateUserController(req, res) {
  const { email, password, newPassword, answer, newUsername ,newEmail } = req.body;
  console.log( email );
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log("i ran");
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err || !result) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }

      const saltRounds = 10;

      if (newPassword) {
        const hash = await bcrypt.hash(newPassword, saltRounds);

        user.name = newUsername || user.name;
        user.email = newEmail || user.email;
        user.password = hash;
        user.answer = answer || user.answer;

        await user.save();
      } else {
        user.name = newUsername || user.name;
        user.email = newEmail || user.email;

        await user.save();
      }

      return res.status(200).json({ success: true, message: "User details updated successfully",user });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
