const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InvitationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    collectionId: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Invitation = mongoose.model("invitations", InvitationSchema);