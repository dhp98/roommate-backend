const userRouter = require('./userRoutes');

module.exports = function (app, router) {

    // app.use('/api', require('./home.js')(router));
    app.use('/api', require('./interestedApartment.js')(router));
    app.use('/api', require('./roomatePreference.js')(router));
    app.use('/api', require('./profile.js')(router));
    app.use('/api', require('./apartment.js')(router));
    app.use('/api/users', userRouter );
};

