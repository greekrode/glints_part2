const express = require("express");
const router = express.Router();
const moment = require("moment");

// Load User model
const Restaurant = require("../../models/Restaurant");

router.get("/", async (req, res) => {
    const { name, day, time } = req.query;
    const convertedTime = moment(time, "hh:mm A").format("H:mm");
    const splitedConvertedTime = convertedTime.split(":");
    const timeInMinutes = parseInt((splitedConvertedTime[0] * 60)) + parseInt(splitedConvertedTime[1]);

    let stages = [];

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
        if (timeInMinutes) {
            expr.push({$lte: ['$start', timeInMinutes]})
            expr.push({$gte: ['$end', timeInMinutes]})
        }
        stages = stages.concat([
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

    if (!stages.length) {
        Restaurant.find().then(restaurant => {
            res.json(restaurant);
        });
    } else {
        Restaurant.aggregate(stages).then(restaurant => {
            res.json(restaurant);
        });
    }
});


module.exports = router;