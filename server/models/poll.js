import mongoose from "mongoose";

const optionSchema = mongoose.Schema({
    optionNumber: {type: Number, required: true},
    optionVotes: {type: Number, required: true, default: 0},
    optionValue: {type: String, required: true}
});

const pollSchema = mongoose.Schema({
    createdBy: {type: String, required: true},
    classId: {type: String, required: true},
    options: [optionSchema],
    studentIds: [String]
});

export default mongoose.model("poll", pollSchema);