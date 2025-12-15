import mongoose from "mongoose";
import argon2 from "argon2";

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First Name must be at least 3 characters long"],
      maxLength: [30, "First Name is too long"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, "Last Name must be at least 3 characters long"],
      maxLength: [30, "Last Name is too long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    minLength: [5, "Email must be at least 5 characters long"],
    maxLength: [50, "Email is too long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
});

captainSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await argon2.hash(this.password);
});


captainSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (err) {
    return false;
  }
};

captainSchema.virtual("fullNameString").get(function () {
  return `${this.fullname.firstname} ${this.fullname.lastname}`;
});

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;
