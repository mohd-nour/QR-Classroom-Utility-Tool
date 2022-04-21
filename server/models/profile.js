import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  image: { type: String, required: true },
  userId: { type: String, required: true },
  name: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, required: true},
  department: {type: String, required: true},
  extension: {type: String, required: true},
  office: {type: String, required: true}
});

export default mongoose.model("Profile", profileSchema);
