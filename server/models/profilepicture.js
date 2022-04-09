import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  image: { type: String, required: true },
  userId: { type: String, required: true }
});

export default mongoose.model("ProfilePicture", imageSchema);
