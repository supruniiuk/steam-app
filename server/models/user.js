const {Schema, model} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
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
{timestamps: {createdAt: 'createdDate'}},
);

module.exports = model('User', userSchema);