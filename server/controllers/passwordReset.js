import mailSend from "../utils/sendEmail.js";
import User from "../models/user.js";
import Token from "../models/token.js";

export const sendEmail = async (req,res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    const userId = existingUser._id;
    if (!existingUser) {return res.status(404).json({message:"User does not exist."});}
    console.log(existingUser);
    console.log(userId+"test");
    try {
        mailSend(email,"Reset password", "Hello! this is a test mail");
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const resetPassword = async (req,res) => {
    
}