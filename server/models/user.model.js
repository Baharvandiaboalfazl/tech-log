import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://freesvg.org/img/abstract-user-flat-4.png",
    },
    role: {
      type: String,
      enum: ["user", "editor", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      maxLength: 200,
      default: "",
    },
    socials: {
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      telegram: { type: String, default: "" },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
