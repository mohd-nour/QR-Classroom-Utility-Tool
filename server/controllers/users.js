import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
//import Token from "../models/token.js";
import emailValidator from "deep-email-validator";
//import deepValidate from 'deep-email-validator'
//import EmailValidator from 'email-deep-validator';
//import emailValidator from 'deep-email-validator-extended'


export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ message: "You are not registered", error: true });
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
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error: true });
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, instituteId } = req.body;
  console.log(email);
  try {
    const { valid, validators, reason } = await emailValidator.validate(email);
    //const valid = await deepValidate(email);
    //const { wellFormed, validDomain, validMailbox } = await emailValidator.verify('foo@bad-domain.com');
    //let response = await emailValidator.validate(email);
    const isValid = validators.regex.valid && validators.typo.valid && validators.disposable.valid && validators.mx.valid;
    if (!isValid)
      return res.json({ message: "Mail does not exist!", error: true });
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
    if (!instituteId){
      result = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
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
        result = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          instituteId: instituteId
        });
      }
    }
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
