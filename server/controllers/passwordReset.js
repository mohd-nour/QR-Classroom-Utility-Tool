import mailSend from "../utils/sendEmail.js";
import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export const sendEmail = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist.", error: true });
  }
  const userId = existingUser._id;
  const name = existingUser.name;
  try {
    const existingToken = await Token.findOne({userId: userId});
    if (existingToken!=null) {
      return res.json({ message: "Your last request to reset your password has not expired!", error: true });
    }
    const token = crypto.randomBytes(32).toString("hex");
    const link =
      "http://localhost:3000/forgotPass/resetPass/" + userId + "/" + token;
    const message =
      "Hello " +
      name +
      "\nIf you want to reset your password, please click the link below:\n" +
      link +
      "\nThis link will expire in 15 minutes";
    mailSend(email, "Reset password", message);

    const addedToken = await Token.create({ userId: userId, token: token });
    res.status(200).json({message:"A reset password mail has been sent to your email", error: false})
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: true });
  }
};

export const resetPassword = async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;
  const { newPass, confirmNewPass } = req.body;
  const existingUser = await User.findOne({ _id: id });
  const existingToken = await Token.findOne({ token: token });
  if (!existingUser) {
    return res.json({
      message: "Invalid request, user does not exist",
      error: true,
    });
  }
  if (!existingToken) {
    return res.json({
      message:
        "Link has expired, please send another request to reset your password",
      error: true,
    });
  }
  if (newPass != confirmNewPass) {
    return res.json({
      message: "Password and confirm password fields do not match",
      error: true,
    });
  }
  const hashedPassword = await bcrypt.hash(newPass, 12);
  User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    function (err, docs) {
      if (err) {
        return res.json({ message: err.message, error: true });
      }
    }
  );
  await Token.findByIdAndDelete(existingToken._id);
  return res.json({ message: "Password changed successfully! ", error: false });
};
