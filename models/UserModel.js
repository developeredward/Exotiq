const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { ObjectId } = mongoose.Schema.Types;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please enter a valid email",
    ],
    index: true,
  },
  password: { type: String, required: true },
  role: { type: String, default: "customer", enum: ["customer", "admin"] },
  photo: {
    type: String,
    required: true,
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  phone: { type: String, default: "+234" },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 12, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
