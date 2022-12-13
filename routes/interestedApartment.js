const User = require("../models/user");
const Apartment = require('../models/apartment')
const InterestedApartment = require('../models/interestedApartment')
// const authMiddleware = require('../middlewares/authMiddleware');


module.exports = function (router) {
    var rs = router.route("/interestedapartment");
    var r = router.route("/interestedapartment/:aptID");
    
    r.get(async (req, res) => {
        const apartmentID = req.params.aptID
        const objs = await InterestedApartment
            .find({ apartmentID: apartmentID })
            .populate('userID','_id firstName lastName')
            // .select("_id firstName lastName")
        console.log("get interested apts pppl")
        console.log(objs)
        res.status(200).send({
            message: "Retuning Interested Users",
            data: objs
        })
    })

    rs.post(async (req,res) => {
        const userID = req.body.userID;
        const apartmentID = req.body.apartmentID
        console.log(userID, apartmentID)

        const response = await InterestedApartment.findOne({
            apartmentID: apartmentID,
            userID: userID
        }).populate('userID','_id firstName lastName')
        console.log(response)
        if(response) {
            InterestedApartment.deleteMany({
                apartmentID: apartmentID,
                userID: userID
            }).then(() => {
                res.status(201).send({
                    message: "Marked apartment as not interested.",
                    data: {...response._doc, interested: false}
                })
            })
        }
        else{
            console.log("in else")
            console.log(userID)
            const newObj = new InterestedApartment({
                userID: userID,
                apartmentID: apartmentID
            })
            console.log("newObj")
            console.log(newObj)
            let z = await newObj.save()
            console.log("zzzz")
            console.log(z)
            z = await InterestedApartment.findOne({ _id: z._id })
                .populate('userID','_id firstName lastName')
    
            res.status(201).send({
                message: "Marked apartment as interested.",
                data: {...z._doc, interested: true}
            })
        }

    })
    
    
    return router;
};
