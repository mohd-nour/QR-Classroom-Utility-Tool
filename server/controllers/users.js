import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import crypto from "crypto";
import mailSend from "../utils/sendEmail.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const mode = req.params.mode;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ message: "You are not registered", error: true });
    }
    const instituteId = existingUser.instituteId;
    if (mode=="web" && instituteId!=null){
      return res.json({ message: "You are not registered", error: true });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({ message: "Incorrect password", error: true });
    }
    if (existingUser.verified){
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "test",
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: existingUser, token, error: false });
    }
    else {
      res.status(201).json({ message: 'You are not verified', error: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: true });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, instituteId } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({
        message: "Someone is already registered with this email",
        error: true,
      });
    if (password != confirmPassword)
      return res.json({
        message: "Password and confirm password fields do not match",
        error: true,
      });
    const hashedPassword = await bcrypt.hash(password, 12);
    var result;
    const verificationToken = crypto.randomBytes(32).toString("hex");
    if (!instituteId){
      console.log(verificationToken);
      result = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        verificationToken: verificationToken
      });
    }
    else {
      const existingUser = await User.findOne({instituteId:instituteId});
      if (existingUser){
        console.log(existingUser);
        return res.json({
          message: "Someone is already registered with this institute ID",
          error: true,
        });
      }
      else{
        console.log(verificationToken);
        result = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          instituteId: instituteId,
          verificationToken: verificationToken
        });
      }
    }
    const link = "http://localhost:3000/verifyRegistration/" + email + "/" + verificationToken;
    var mailBody = "Hello "+name+"\nPlease click on the following link to verify that it is you who created this account using this email:\n"+link;
    await mailSend(email,"Account verification",mailBody);
    /*
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    */
    res.status(200).json({ message: "A verification email has been sent to "+email, error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!", error: true });
  }
};

export const verifyAccountRegistration = async (req, res) => {
  try {
    const email = req.params.email;
    const verificationToken = req.params.verificationToken;
    const existingUser = await User.findOne({email: email, verificationToken: verificationToken});
    if (existingUser){
      User.updateOne(
        {email: email, verificationToken: verificationToken}, 
        {$set: { verified: true }},
        async (err, result) => {
          if (err){
            res.send(err);
          }
          else{
            const verifiedUser = await User.findOne({email: email, verificationToken: verificationToken});
            res.status(200).json({verifiedUser});
          }
        }); 
    }
    else{
      res.send(err);
    }
  } catch (error) {
    res.status(200).json({ message: "Something went wrong!" });
  }
};


