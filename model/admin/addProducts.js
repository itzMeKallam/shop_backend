const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminProductsSchema = new Schema({
  title: {
          type: String,
          required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId, 
    ref: 'AdminUser'
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminProducts', adminProductsSchema);
