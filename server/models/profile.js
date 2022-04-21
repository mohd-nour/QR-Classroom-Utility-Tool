import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  image: { type: String },
  userId: { type: String },
  name: {type: String},
  email: {type: String},
  role: {type: String},
  department: {type: String},
  extension: {type: String},
  office: {type: String}
});

export default mongoose.model("Profile", profileSchema);
