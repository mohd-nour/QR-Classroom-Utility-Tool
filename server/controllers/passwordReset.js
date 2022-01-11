import mailSend from "../utils/sendEmail.js";
import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";

export const sendEmail = async (req,res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    const userId = existingUser._id;
    const name = existingUser.name;
    if (!existingUser) {return res.status(404).json({message:"User does not exist."});}
    console.log(userId);
    const link = "http://localhost:3000/"+userId;
    try {
        const message = "Hello "+name+"\n If you want to reset your password, please click the link below:\n"+link;
        mailSend(email,"Reset password", message);

        const addedToken = await Token.create({id: userId, token: crypto.randomBytes(32).toString("hex")});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const resetPassword = async (req,res) => {
    
}