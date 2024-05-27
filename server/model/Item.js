import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  selectedValue: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now // Set default value to the current date and time
  },
  createsource: [{ type: String }] // Define createsource as an array of strings
});

export default mongoose.model("item", blogSchema);

