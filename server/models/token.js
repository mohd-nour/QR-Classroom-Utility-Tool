import mongoose from 'mongoose';

const tokenSchema = mongoose.Schema({
    id: {type: String, required: true},
    token: {type: String, required: true}
});

export default mongoose.model("Token", tokenSchema);