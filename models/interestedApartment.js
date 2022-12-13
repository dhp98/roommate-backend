var mongoose = require('mongoose');

// Define our user schema
var InterestedApartmentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    apartmentID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Apartment"
    },
},{
    timestamps: true
});

// Export the Mongoose model
module.exports = mongoose.model('InterestedApartment', InterestedApartmentSchema);
