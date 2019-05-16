const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RestaurantHourSchema = new Schema({
    restaurantId: {
        type: String,
    },
    day: {
        type: String,
    },
    start: {
        type: Number,
    },
    end: {
        type: Number,
    }
});

module.exports = RestaurantHour = mongoose.model("restauranthours", RestaurantHourSchema);