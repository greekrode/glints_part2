const express = require("express");
const router = express.Router();

// Load User model
const Restaurant = require("../../models/Restaurant");

router.get("/", (req, res) => {
    Restaurant.find().then(restaurants => {
        res.json(restaurants)
    })
    .catch(err => {
        res.status(404).send(err.errors);
    })
    ;
});

module.exports = router;
