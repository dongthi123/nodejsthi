const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');


const thiiSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thiiSchema.plugin(toJSON);
thiiSchema.plugin(paginate);

/**
 * @typedef Thii
 */
const Thii = mongoose.model('Thii', thiiSchema);

module.exports = Thii;
