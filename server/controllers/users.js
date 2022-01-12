import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Token from '../models/token.js';
import emailValidator from 'deep-email-validator';

export const signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {return res.json({message:"You are not registered", error:true});}
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {return res.json({message:"Incorrect password", error:true});}
        const token = jwt.sign({email: existingUser.email, id:existingUser._id},'test', {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!", error:true});
    }
}

export const signup = async (req,res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const {valid, validators, reason} = await emailValidator.validate(email);
        if (!valid) return res.json({message: "Mail does not exist!", error:true});
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({message:"Someone is already registered with this email", error:true});
        if (password!=confirmPassword) return res.json({message:"Password and confirm password fields do not match", error:true});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({name: name, email: email, password: hashedPassword});
        const token = jwt.sign({email: result.email, id:result._id},'test', {expiresIn: "1h"});
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}