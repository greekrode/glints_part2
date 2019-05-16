const express = require("express");
const router = express.Router();
const arrayUnion = require('array-union');
const { Types } = require("mongoose");
const { ObjectId } = Types;
const moment = require("moment");

// Load User model
const Restaurant = require("../../models/Restaurant");
const RestaurantHour = require("../../models/RestaurantHour");

router.get("/", async (req, res) => {
    let openDays = [];
    let openHours = [];
    let objectIds = [];
    const { name, day, time } = req.query;
    const convertedTime = moment(time, "hh:mm A").format("H:mm");
    const splitedConvertedTime = convertedTime.split(":");
    const timeInMinutes = parseInt((splitedConvertedTime[0] * 60)) + parseInt(splitedConvertedTime[1]);

    if (day) {
        const restaurantHour = await RestaurantHour.find({ day: day.toLowerCase() }, { restaurantId: 1 }).lean().exec();
        openDays = restaurantHour.map((r) => r.restaurantId);
    }


    const stages = [];

    if (name) {
        stages.push({
            $match: {
                name: { $regex: name, $options: 'i' }
            }
        })
    }

    if (day || timeInMinutes > 0) {
        let expr = [{$eq: ['$restaurantId', '$$strId']}]
        if (day) {
            expr.push({$eq: ['$day', day]})
        }
        if (time) {
            expr.push({$lte: ['$start', timeInMinutes]})
            expr.push({$gte: ['$end', timeInMinutes]})
        }
        stages.concat([
            {
                $lookup: {
                    from: 'restauranthours',
                    let: { strId: { $toString: '$_id' } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: expr
                                }
                            }
                        }
                    ],
                    as: 'restaurantHours',
                },
            }, {
                $match: {
                    'restaurantHours.0': {$exists: true}
                }
            }
        ])
    }

    Restaurant.aggregate(stages).then( restaurant => {
        // openHours = restaurantHour.map((r) => r.restaurantId);
        res.json(restaurant);
        return;
    });

    // if (day) {
    //     stages.concat([
    //         {
    //             $lookup: {
    //                 from: 'restauranthours',
    //                 let: {strId: {$toString: '$_id'}},
    //                 pipeline: [
    //                     {
    //                         $match: {
    //                             $expr: {
    //                                 $and: [
    //                                     {$eq: ['$restaurantId', '$$strId']},
    //                                     {$eq: ['$day', day]},
    //                                 ]
    //                             }
    //                         }
    //                     }
    //                 ],
    //                 as: 'restaurantHours',
    //             },
    //         }, {
    //             $match: {
    //                 'restaurantHours.0': {$exists: true}
    //             }
    //         }
    //     ]);
    // }


    // if (day && timeInMinutes) {
    //     objectIds = arrayUnion(openDays, openHours);
    // } else {
    //     if (day) {
    //         objectIds = openDays
    //     } else {
    //         objectIds = openHours
    //     }
    // }
    //
    // const filter = {};
    // if (name) {
    //     filter.name = {$regex: `${name}`, $options: "i"}
    // }
    //
    // if (objectIds.length > 1) {
    //     filter._id = {$in: objectIds.map(_id => ObjectId(_id))}
    // }
    //
    // Restaurant.find(filter).then(restaurants => {
    //     res.json(restaurants);
    // })
    // .catch(err => {
    //     res.status(404).send(err.errors);
    // });
});


module.exports = router;
