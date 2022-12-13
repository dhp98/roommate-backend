const User = require("../models/user");
const Apartment = require('../models/apartment')
const Profile = require('../models/profile')

// sample aptID: 6382b7857f8d50460bcf7a42
// sample userID: 6382b6a5937aeccafe208b74
module.exports = function (router) {
    var rs = router.route("/profile");
    var r = router.route("/profile/:userID");
    
    // http://localhost:4000/api/profile/6382b7857f8d50460bcf7a42
    r.get(async (req, res) => {
        const userID = req.params.userID
        const objs = await Profile
            .find({ userID: userID })
            .populate('userID','_id firstName lastName')

        res.status(200).send({
            message: "Retuning Profile of User",
            data: objs
        })
    })

    rs.get(async (req, res) => {
        let whereString = {}
        let selectString = {}
        let options = {}

        for (const [key, value] of Object.entries(req.query)) {
            if (key === 'where') {
                whereString = JSON.parse(value);
            } else if (key === 'select') {
                selectString = JSON.parse(value);
            } else if (key === 'sort') {
                options.sort = JSON.parse(value);
            } else if (key === 'skip') {
                options.skip = parseInt(value)
            } else if (key === 'limit') {
                options.limit = parseInt(value)
            }
        }
    

        try {
            const foundProfiles =  await Profile
                .find(whereString, selectString, options)
                .populate('userID','_id firstName lastName')

            res.status(200).send({
                message: "OK",
                data: foundProfiles
            })

        } catch (err) {
            res.status(500).send({
                message: "Error",
                data: err
            })
        }

    })

    rs.post(async function(req, res) {
        try {
            const newProfile = new Profile(req.body);
            const createdProfile = await newProfile.save()
            res.status(201).send({
                message: "Profile Created",
                data: createdProfile
            })

        } catch (err) {
            res.status(500).send({
                message: "Error",
                data: err
            })
        }
    })

    r.put(async function(req, res) {
        const userID = req.params.userID;
        try {
            await Profile.updateOne({userID: userID}, req.body)
            const updatedUser = await Profile.findOne({userID: userID});
            res.status(200).send({
                message: "OK",
                data: updatedUser
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                message: "Error",
                data: err
            })
        }
    })

    r.delete(async function(req, res) {
        const profileID = req.params.userID;
        try {
            await Profile.findByIdAndDelete(profileID)
            res.status(200).send({
                message: "OK",
                data: {}
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                message: "Error",
                data: err
            })
        }
    })
    
    return router;
};
