var mongoose = require('mongoose');

// Define our user schema
var ApartmentSchema = new mongoose.Schema({
    description: String,
    numberOfBaths: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    numberOfBeds: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    address: {
        type: String,
        default: "",
        required: true,
    },
    squareFeet: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    deposit: {
        type: Number,
        default: 0
    },
    laundry: {
        type: Boolean,
        default: false
    },
    dishwasher: {
        type: Boolean,
        default: false
    },
    television: {
        type: Boolean,
        default: false
    },
    internet: {
        type: Boolean,
        default: false
    },
    petFriendly: {
        type: Boolean,
        default: false
    },
    elevator: {
        type: Boolean,
        default: false
    },
    parking: {
        type: Boolean,
        default: false
    },
    otherInfo: {
        type: String,
        default: ""
    },
    photos: [
        {
            type: String,
        }
    ],
    ownerID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },

},{
    timestamps: true
});

// Export the Mongoose model
module.exports = mongoose.model('Apartment', ApartmentSchema);
