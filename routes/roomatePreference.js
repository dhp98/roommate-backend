const RoommatePreference = require('../models/roommatePreference')

// sample aptID: 6382b7857f8d50460bcf7a42
// sample userID: 6382b6a5937aeccafe208b74
module.exports = function (router) {
    var r = router.route("/roomatepreference/:userID");
    
    // http://localhost:4000/api/roomatepreference/6382b6a5937aeccafe208b74
    r.get(async (req, res) => {
        const userID = req.params.userID
        const obj = await RoommatePreference
            .find({ userID: userID })
            .populate('userID','_id firstName lastName')

        res.status(200).send({
            message: "Retuning Roomate Preserence",
            data: obj
        })
    })
    
    return router;
};

// const rp = new RoommatePreference({
//     userID: userID,
//     foodPreferences: "Vegan",
//     maxAge: 25,
//     studyProgram: "MCS",
//     language: ["Marathi","Hindi"],
//     nationality: ["Indian","USA"]
// })
// await rp.save()