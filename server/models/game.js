const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [String],
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model('Game', gameSchema);
