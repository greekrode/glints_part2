const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CollectionUserSchema = new Schema({
    collectionId: {
        type: String,
        required: true
    },
    collectionName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
});

module.exports = CollectionUser = mongoose.model("collectionUsers", CollectionUserSchema);