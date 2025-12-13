import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema({
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
    minLength: [5, "Email must be at least 5 characters long"],
    maxLength: [50, "Email is too long"],
  },
  password: {
    type: String,
    required: true,
    select: false, // ✅ secure
  },
  socketId: {
    type: String,
    default: "",
  },
});

// ✅ Simplified async hook
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await argon2.hash(this.password);
});

// ✅ Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await argon2.verify(this.password, candidatePassword);
};

const User = mongoose.model("User", userSchema);
export default User;
