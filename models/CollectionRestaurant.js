const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CollectionRestaurantSchema = new Schema({
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
    },
    collectionId : {
        type: String,
        required: true
    }
});

module.exports = CollectionRestaurant = mongoose.model("collectionRestaurants", CollectionRestaurantSchema);