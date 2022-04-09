import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { UnverifiedUser } from "../models/user.js";
import crypto from "crypto";
import mailSend from "../utils/sendEmail.js";
import ProfilePicture from "../models/profilepicture.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const mode = req.params.mode;
  console.log("signin backend");
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        message: "This account is not registered",
        error: true,
      });
    }
    const instituteId = existingUser.instituteId;
    if (mode == "web" && instituteId != null) {
      return res.json({
        message: "This account is not registered",
        error: true,
      });
    }
    if (mode == "mobile" && instituteId == null) {
      return res.json({
        message: "This account is not registered",
        error: true,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.json({ message: "Incorrect password", error: true });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token, error: false });
    /*
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
    */
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: true });
  }
};

export const setProfilePicture = async (req, res) => {
  try {
    const {userId, image} = req.body;
    console.log(userId);
    console.log("reached backend set image");
    const existingImage = await ProfilePicture.findOne({userId, userId});
    if (existingImage){
      ProfilePicture.findOneAndUpdate({userId: userId}, {
        image: image
      }, function(err, result){
        if (err){
          res.send(err);
        }
        else{
          res.status(200).send(result);
        }
      });
    }
    else {
      result = await ProfilePicture.create({
        userId: userId,
        image: image
      });
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const signup = async (req, res) => {
  console.log("reached signup backend");
  const { name, email, password, confirmPassword, instituteId } = req.body;
  console.log({ name, email, password, confirmPassword, instituteId });
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
    if (!instituteId) {
      result = await UnverifiedUser.create({
        name: name,
        email: email,
        password: hashedPassword,
        verificationToken: verificationToken,
      });
    } else {
      const existingUser = await User.findOne({ instituteId: instituteId });
      if (existingUser) {
        return res.json({
          message: "Someone is already registered with this institute ID",
          error: true,
        });
      } else {
        result = await UnverifiedUser.create({
          name: name,
          email: email,
          password: hashedPassword,
          instituteId: instituteId,
          verificationToken: verificationToken,
        });
      }
    }
    const link =
      "http://localhost:3000/verifyRegistration/" +
      email +
      "/" +
      verificationToken;
    var mailBody =
      "Hello " +
      name +
      "\nPlease click on the following link to verify that it is you who created this account using this email:\n" +
      link;
    await mailSend(email, "Account verification", mailBody);
    res.status(200).json({
      message: "A verification email has been sent to " + email,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!", error: true });
  }
};

export const verifyAccountRegistration = async (req, res) => {
  try {
    const email = req.params.email;
    const verificationToken = req.params.verificationToken;
    const existingVerifiedUser = await User.findOne({
      email: email,
      verificationToken: verificationToken,
    });
    if (existingVerifiedUser) {
      return res.send({ error: true, message: "You are already verified" });
    }
    const existingUnverifiedUser = await UnverifiedUser.findOne({
      email: email,
      verificationToken: verificationToken,
    });
    var verifiedUser;
    if (existingUnverifiedUser) {
      if (existingUnverifiedUser.instituteId) {
        console.log("With id");
        console.log(existingUnverifiedUser);
        verifiedUser = await User.create({
          name: existingUnverifiedUser.name,
          email: existingUnverifiedUser.email,
          password: existingUnverifiedUser.password,
          instituteId: existingUnverifiedUser.instituteId,
        });
      } else {
        console.log("Without id");
        console.log(existingUnverifiedUser);
        verifiedUser = await User.create({
          name: existingUnverifiedUser.name,
          email: existingUnverifiedUser.email,
          password: existingUnverifiedUser.password,
        });
      }
      await UnverifiedUser.findByIdAndDelete(existingUnverifiedUser._id);
      res.status(200).json({ verifiedUser, error: false });
    } else {
      res.send({ error: true, message: "You did not register" });
    }
    /*
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
    */
  } catch (error) {
    res.status(200).json({ message: error.message, error: true });
  }
};
