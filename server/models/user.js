const { Schema, model } = require("mongoose");
const ROLES = ["admin", "developer", "gamer"];
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: ROLES,
    },
    birthday: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
