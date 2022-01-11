import mailSend from "../utils/sendEmail.js";
import User from "../models/user.js";
import Token from "../models/token.js";

export const sendEmail = async (req,res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    const userId = existingUser._id;
    const name = existingUser.name;
    const tokenEntry = await Token.findOne({id: userId});
    const token = tokenEntry.token;
    if (!existingUser) {return res.status(404).json({message:"User does not exist."});}
    console.log(userId);
    console.log(token);
    const link = "http://localhost:5000/"+userId+"/"+token;
    try {
        const message = "Hello "+name+"\n If you want to reset your password, please click the link below:\n"+link;
        mailSend(email,"Reset password", message);
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const resetPassword = async (req,res) => {
    
}