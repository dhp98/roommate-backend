const User = require('../models/user')

module.exports = function (router) {
    var users = router.route("/user");

    users.get(async (req, res) => {
        obj = await User.find()
        console.log(obj)
        res.send(obj)
    })
    return router;
};
