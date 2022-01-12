import mailSend from "../utils/sendEmail.js";
import User from "../models/user.js";
import Token from "../models/token.js";
import crypto from "crypto";
import bcrypt from 'bcryptjs';


export const sendEmail = async (req,res) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    const userId = existingUser._id;
    const name = existingUser.name;
    if (!existingUser) {return res.status(404).json({message:"User does not exist."});}
    console.log(userId);
    try {
        const token = crypto.randomBytes(32).toString("hex");
        const link = "http://localhost:3000/forgotPass/resetPass/"+userId+"/"+token;
        const message = "Hello "+name+"\n If you want to reset your password, please click the link below:\n"+link;
        mailSend(email,"Reset password", message);

        const addedToken = await Token.create({id: userId, token: token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const resetPassword = async (req,res) => {
    const id = req.params.id;
    const token = req.params.token;
    const {newPass, confirmNewPass} = req.body;
    const existingUser = await User.findOne({ _id: id });
    const existingToken = await Token.findOne({token: token});
    if (!existingUser){
        return res.json({message:"Invalid request, user does not exist", error: true});
    }   
    if (!existingToken){
        return res.json({message:"Link has expired, please send another request for pass reset", error: true});
    } 
    if (newPass!=confirmNewPass){
        return res.json({message:"Password and confirm password fields do not match", error: true});
    }
    const hashedPassword = await bcrypt.hash(newPass, 12);
    User.findByIdAndUpdate(id, { password: hashedPassword },
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
    }
});
    return res.json({message:"Password changed successfully! ", error: false});
}