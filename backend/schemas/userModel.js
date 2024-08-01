const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "fullName is required"],
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const userSchema = mongoose.model("user", userModel);

module.exports = userSchema;
