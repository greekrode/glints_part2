const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CollectionSchema = new Schema({
  restaurantId: {
    type: String,
    required: true
  },
  restaurantName: {
      type: String,
      required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = Collection = mongoose.model("collections", CollectionSchema);