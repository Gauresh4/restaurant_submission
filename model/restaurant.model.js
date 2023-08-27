const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  imageURL: String,
  location: String,
  phone: Number,
  rating: Number,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },

  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
