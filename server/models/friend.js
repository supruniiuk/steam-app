const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
  {
    subscriberId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    publisherId: {
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

module.exports = model('Friend', friendSchema);
