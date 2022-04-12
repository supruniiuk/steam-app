const { Schema, model } = require('mongoose');

const gameOwningSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    },
  },
  { timestamps: true }
);

module.exports = model('gameOwning', gameOwningSchema);
