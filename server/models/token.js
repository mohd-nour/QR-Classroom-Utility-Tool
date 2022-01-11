import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    id: {type: String, required: true},
    token: {type: String, required: true},
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
});


const Token = mongoose.model("Token", tokenSchema);

export default Token;

