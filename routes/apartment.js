const User = require("../models/user");
const Profile = require('../models/profile')
const Apartment = require('../models/apartment')
const InterestedApartment = require('../models/interestedApartment')

// sample aptID: 6382b7857f8d50460bcf7a42
// sample userID: 6382b6a5937aeccafe208b74

module.exports = function (router) {
    var rs = router.route("/apartment");
    var r = router.route("/apartment/:aptID");

    // http://localhost:4000/api/apartment/6382b7857f8d50460bcf7a42

    r.get(async (req, res) => {
        const apartmentID = req.params.aptID
        const objs = await Apartment
            .find({ apartmentID: apartmentID })
        res.status(200).send({
            message: "Retuning apartment",
            data: objs
        })

        res.send("apartment")
    })

    rs.get(async (req, res) => {
        let whereString = {}
        let selectString = {}
        let options = {}
        console.log(req.query)
        console.log(req.body)
        let foundApartments = Apartment.find() 
        for (const [key, value] of Object.entries(req.query)) {
            if (key === 'where') {
                whereString = JSON.parse(value);
                console.log(whereString)
                foundApartments.find(whereString)
            } else if (key === 'select') {
                selectString = JSON.parse(value);
                console.log(selectString)
                foundApartments.find(whereString)
            } else if (key === 'sort') {
                options.sort = JSON.parse(value);
            } else if (key === 'skip') {
                options.skip = parseInt(value)
            } else if (key === 'limit') {
                options.limit = parseInt(value)
            }
        }

        //
        let q = Apartment.find()
        // https://www.w3schools.com/js/js_json_parse.asp
        const whereQuery = req.query.where ? JSON.parse(req.query.where) : null
        const selectQuery = req.query.select ? JSON.parse(req.query.select) : null
        const skipValue = req.query.skip ? JSON.parse(req.query.skip) : null
        const limitValue = req.query.limit ? JSON.parse(req.query.limit) : null
        const sortQuery = req.query.sort ? JSON.parse(req.query.sort) : null
        const count = req.query.count ? JSON.parse(req.query.count) : null
        console.log(whereQuery)
        console.log(selectQuery)
        console.log(skipValue)
        console.log(limitValue)
        console.log(sortQuery)
        console.log(count)
        
        if(whereQuery) { q = q.find(whereQuery) }
        if(sortQuery) { q = q.sort(sortQuery) }
        if(limitValue) { q = q.limit(limitValue) }
        if(skipValue) { q = q.skip(skipValue) }
        if(selectQuery) { q = q.select(selectQuery) }
        if(count) { q = q.count() }
        
        q = q.populate("ownerID","_id firstName lastName")
        //


        try {
            q.then((foundApartments) => {
                console.log(foundApartments)
                res.status(200).send({
                    message: "OK",
                    data: foundApartments
                })
            })

        } catch (err) {
            res.status(500).send({
                message: "Error",
                data: err
            })
        }
    })
    rs.post(async (req, res) => {
        console.log("req.body for apartment post request")
        console.log(req.body)
        try {
            const newApartment = new Apartment(req.body);
            const createdApartment = await newApartment.save()
            res.status(201).send({
                message: "Apartment Created",
                data: createdApartment
            })

        } catch (err) {
            res.status(500).send({
                message: "Error",
                data: err
            })
        }
    })

    r.put(async function (req, res) {
        const aptID = req.params.aptID;
        try {
            await Apartment.updateOne({ aptID: aptID }, req.body)
            const updatedApartment = await Apartment.findOne({ aptID: aptID });
            res.status(201).send({
                message: "OK",
                data: updatedApartment
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

// const u = new User({
//     firstName: "RUg",
//     lastName: "B",
//     email: "rugved@rugved.com",
//     password: "password"
// })
// u.save()
// const a = new Apartment({
//     numberOfBaths: 3,
//     numberOfBeds: 2,
//     price: 1000,
//     address: "809 W Springfield",
//     squareFeet: "770",
//     startDate: "August 2022",
//     endDate: "July 2023",
//     deposit: 890,
//     ownerInfo: "6382b6a5937aeccafe208b74",
//     laundry: true,
//     dishwasher: true,
//     television: true,
//     internet: true,
//     petFriendly: true,
//     elevator: true,
//     parking: true,
//     otherInfo: "b99",
//     photos: ["url1", "url2"]
// })
// a.save()