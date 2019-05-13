const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const shortid = require('shortid');

const Collection = require("../../models/Collection");
const CollectionRestaurant = require("../../models/CollectionRestaurant");
const CollectionUser = require("../../models/CollectionUser");
const Invitation = require("../../models/Invitation");
const Restaurant = require("../../models/Restaurant");
const User = require("../../models/User");

const auth = {
    auth: {
        api_key: 'ff5fc9a477ec5fdfb61d9385965023d9-9525e19d-9aa891e2',
        domain: 'sandbox646c2c45d8ac4f379d5f144ecce25623.mailgun.org'
    }
};

router.post("/", (req, res) => {
        const newCollection = new Collection({
            name: req.body.name,
            userId: req.user._id
        });

        newCollection
            .save()
            .then(collection => res.json(collection))
            .catch(err => res.json(err));
});

router.get("/", (req, res) => {
    Collection.find({userId : req.user._id}).then(collections => {
        res.json(collections)
    })
    .catch(() => {
        res.status(400).send({'message': 'No collection!'});
    })
});

router.get("/users", (req, res) => {
    CollectionUser.find({userId : req.user._id}).then(collections => {
        res.json(collections)
    })
        .catch(() => {
            res.status(400).send({'message': 'No collection!'});
        })
});

router.get("/:id", (req, res) => {
    CollectionRestaurant.find({ collectionId: req.params.id }).then(collectionRestaurants => {
        res.json(collectionRestaurants)
    })
    .catch(() => {
        res.status(400).json({'message': 'Collection list not found!'})
    })
});

router.post("/add/:id", (req, res) => {
    Collection.findById(req.params.id).then(() => {
        CollectionRestaurant.findOne({ restaurantId: req.body.restaurant }).then( collection => {
            if (collection) {
                return res.status(400).json({ message: "Selected restaurant has been added." })
            }

            Restaurant.findById(req.body.restaurant).then( restaurant => {
                if (!restaurant) {
                    return res.status(400).json({ message: "Restaurant not found" });
                }

                const newCollectionRestaurant = new CollectionRestaurant({
                    restaurantId: req.body.restaurant,
                    restaurantName: restaurant.name,
                    userId: req.user._id,
                    collectionId: req.params.id
                });

                newCollectionRestaurant
                    .save()
                    .then(collection => res.json(collection))
                    .catch(() => res.status(400).json({'message': 'Fail to save restaurant to collection!'}))
            })
        })
    })
    .catch(() => {
        res.status(400).json({'message': 'Collection not found!'});
    })
});

router.delete("/:id", (req, res) => {
    Collection.findByIdAndRemove(req.params.id).then( () => {
            res.json({'message' : 'Collection deleted!'});
        })
        .catch(err => {
            res.status(400).json(err.errors);
        })
});

router.delete("/restaurant/:id", (req, res) => {
    CollectionRestaurant.findByIdAndRemove(req.params.id).then(() => {
        res.json({'message': 'Restaurant removed!'});
    })
    .catch(() => {
        res.status(400).json({'message': 'Restaurant can\'t be removed!'});
    })
});

router.post("/invite/:id", (req, res) => {
    Collection.findById(req.params.id).then(() => {
        let code = shortid.generate();

        const newInvitation = new Invitation({
            userId: req.user._id,
            receiver: req.body.email,
            code: code,
            collectionId: req.params.id
        });

        newInvitation
            .save()
            .then(() => {
                const invitationLink = 'http://localhost:3000/invite/'+ req.user._id + '-' + code;

                const transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "ffb361da0a2c35",
                        pass: "843a8e156fcc1c"
                    }
                });

                transport.sendMail({
                    from: req.user.email,
                    to: req.body.email,
                    subject: 'Join my collection of restaurant!',
                    html: '<p><b>' + req.user.name + '</b> has invited you to join his collection of restaurant! Your invitation link is: ' +
                        '<a href="' + invitationLink + '">CLICK HERE</a></p>'
                }).then(() => {
                    res.json({'message': 'Invitation sent!'})
                }).catch(err => {
                    res.status(400).json({'message': 'Can\'t send mail!'})
                })
            })
            .catch(() => {
                res.json(400).json({'message': 'Fail to send invitation!'})
            });
    })
    .catch(() => {
        res.status(400).json({'message': 'Something is wrong. Please try again!'});
    })
});

router.get("/invite/:id", (req, res) => {
   let sender = req.params.id.trim().split("-")[0].trim();
   let inviteCode = req.params.id.trim().split("-")[1].trim();

   Invitation.findOne({ userId: sender, code: inviteCode}).then(invitation => {
       CollectionUser.findOne({ userId: req.user._id, collectionId: invitation.collectionId }).then(collectionUser => {
           User.findById(sender).then( user => {
               Collection.findById(invitation.collectionId).then(collection => {
                   if (collectionUser) {
                       return res.status(400).json({'message': 'You have joined this collection!'});
                   }

                   const newCollectionUser = new CollectionUser({
                       collectionId: invitation.collectionId,
                       collectionName: collection.name,
                       userId: req.user._id,
                       userName: user.name
                   });

                   newCollectionUser
                       .save()
                       .then(() => {
                           res.json({'message' : 'Invited to collection!'})
                       })
                       .catch(() => {
                           res.json({'message' : 'Can\'t join the collection!'})
                       })
               })
               .catch(err => {
                   res.status(400).json(err)
               })
           })
           .catch(err => {
               res.status(400).json(err)
           })
       })
       .catch(err => {
           res.status(400).json(err)
       })
   })
   .catch(() => {
       res.status(400).json({'message': 'Invalid invite link!'});
   })
});


module.exports = router;
