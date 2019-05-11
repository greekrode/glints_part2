const express = require("express");
const router = express.Router();

const Collection = require("../../models/Collection");

const Restaurant = require("../../models/Restaurant");

router.post("/", (req, res) => {
    Collection.findOne({ restaurantId: req.body.restaurant }).then(collection => {
        if (collection) {
            return res.status(400).json({ message: "Selected restaurant has been added." })
        }

        Restaurant.findOne({ _id: req.body.restaurant }).then(restaurant => {
            if (!restaurant) {
                return res.status(400).json({ message: "Restaurant not found" });
            }

            const newCollection = new Collection({
                restaurantId: req.body.restaurant,
                restaurantName: restaurant.name,
                userId: req.user._id
            });

            newCollection
                .save()
                .then(collection => res.json(collection))
                .catch(err => res.json(err));
        })
        });
});


router.get("/", (req, res) => {
    Collection.find().then(collections => {
        res.json(collections)
    })
    .catch(err => {
        res.status(400).send(err.errors);
    })
    ;
});

router.delete("/:id", (req, res) => {
    Collection.findByIdAndRemove(req.params.id).then( () => {
            res.json({'message' : 'Collection deleted!'});
        })
        .catch(err => {
            res.status(400).json(err.errors);
        })
});

module.exports = router;
