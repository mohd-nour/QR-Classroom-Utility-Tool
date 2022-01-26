import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  instituteId: { type: String },
  classes: [String] // Course ids stored in the array
});

const unverifiedUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  instituteId: { type: String },
  verificationToken: {type: String},
});

const User = mongoose.model("User", userSchema);
export const UnverifiedUser = mongoose.model("UnverifiedUser", unverifiedUserSchema);

export default User;
