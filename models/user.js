const mongoose = require("mongoose");

// schema creation
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default: "NORMAL",
    },
  },
  { timestamps: true }
);

// modal creation
const USER = mongoose.model("user", userSchema);

module.exports = USER;
