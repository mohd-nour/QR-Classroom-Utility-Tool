import mailSend from "../utils/sendEmail.js";
import User from "../models/user.js";

export const sendEmail = async (req,res) => {
    const { email } = req.body;
    console.log(email);
    try {
        mailSend(email,"Reset password", "Hello! this is a test mail");
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const resetPassword = async (req,res) => {

}