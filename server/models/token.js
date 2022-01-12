import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    id: {type: String, required: true},
    token: {type: String, required: true},
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1h' }
    }
});


const Token = mongoose.model("Token", tokenSchema);

export default Token;

