import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {return res.status(404).json({message:"User does not exist."});}
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {return res.status(400).json({message:"Incorrect password"});}
        const token = jwt.sign({email: existingUser.email, id:existingUser._id},'test', {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const signup = async (req,res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({message:"User already exists."});
        if (password!=confirmPassword) return res.status(400).json({message:"Passwords don't match."});
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({name: name, email: email, password: hashedPassword});
        const token = jwt.sign({email: result.email, id:result._id},'test', {expiresIn: "1h"});
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}