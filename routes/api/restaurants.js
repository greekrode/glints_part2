const express = require("express");
const router = express.Router();
const arrayUnion = require('array-union');
const { Types } = require("mongoose");
const { ObjectId } = Types;

// Load User model
const Restaurant = require("../../models/Restaurant");
const RestaurantHour = require("../../models/RestaurantHour");

router.get("/", async (req, res) => {
    let openDays = [];
    let openHours = [];
    let objectIds = [];
    const { name, day, time } = req.query;

    if (day) {
        const restaurantHour = await RestaurantHour.find({ day: day.toLowerCase() }, { restaurantId: 1 }).lean().exec();
        openDays = restaurantHour.map((r) => r.restaurantId);
    }

    if (time) {
        const restaurantHour = await RestaurantHour.find({
            start: { "$gte": time },
            end: { "$lte": time}
            },
            { restaurantId: 1 }).lean().exec();
        openHours = restaurantHour.map((r) => r.restaurantId);
    }

    if (openDays.length > 1 && openHours.length > 1) {
        objectIds = arrayUnion(openDays, openHours);
    } else {
        if (openDays.length > 1) {
            objectIds = openDays
        } else {
            objectIds = openHours
        }
    }

    const filter = {};
    if (name) {
        filter.name = {$regex: `${name}`, $options: "i"}
    }

    if (objectIds.length > 1) {
        filter._id = {$in: objectIds.map(_id => ObjectId(_id))}
    }

    Restaurant.find(filter).then(restaurants => {
        res.json(restaurants);
    })
    .catch(err => {
        res.status(404).send(err.errors);
    });
});


module.exports = router;
