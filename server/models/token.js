import mongoose from "mongoose";

function addHoursToDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 15);
  return date;
}

const tokenSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: true },
    expireAt: { type: Date, default: addHoursToDate() },
    /*
    expireAt: {
        type: Date,
        default: Date.now,
        //index: { expires: '1h' }
    }
    */
    //createdAt: { type: Date, expires: 60, default: Date.now }
    //date: { type: Date, index: { unique: true, expires: '20' }}
  },
  { timestamps: true }
);

tokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model("Token", tokenSchema);

export default Token;
