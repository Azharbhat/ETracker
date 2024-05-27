import mongoose from "mongoose";

const Schema = mongoose.Schema;

const createSourceSchema = new Schema({
  selectedOption: {
    type: String,
    required: true,
  },
  textInput: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createsource: [String]
});

export default mongoose.model("CreateSource", createSourceSchema);
