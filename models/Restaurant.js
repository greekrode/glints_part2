const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  openHours: {
    type: String,
    required: true
  }
});

module.exports = Restaurant = mongoose.model("restaurants", RestaurantSchema);