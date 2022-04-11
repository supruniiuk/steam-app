const { Schema, model } = require("mongoose");

const gameBuyerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: "Game",
  },
},
{timestamps: true},
);

module.exports = model("Buyer", gameBuyerSchema);
