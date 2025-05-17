import mongoose from "mongoose";
//Product Schema or product model

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ["Tablet", "Syrup", "Injection", "Capsule", "Other"] // Example categories, update as needed
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  manufacturer: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: ""
  },
  prescriptionRequired: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  },
  dosageInstructions: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
