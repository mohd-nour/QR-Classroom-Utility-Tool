import mongoose from "mongoose";

const optionSchema = mongoose.Schema({
    optionNumber: {type: Number, required: true},
    optionValue: {type: String, required: true}
});

const pollSchema = mongoose.Schema({
    createdBy: {type: String, required: true},
    classId: {type: String, required: true},
    options: [optionSchema],
    studentIds: [String]
});

export default mongoose.model("poll", pollSchema);