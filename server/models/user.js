import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  instituteId: { type: String },
  verificationToken: {type: String},
  verified: {type: Boolean, default: false}
});

const user = mongoose.model("User", userSchema);

export default user;
