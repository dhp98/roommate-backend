var mongoose = require('mongoose');

// Define our user schema
var RoomatePreference = new mongoose.Schema({
    userID:{
            type: mongoose.Schema.Types.ObjectId, 
            require: true,
            ref: "User"
    },
    foodPreferences: {
        type: String,
        require: true,
        enum: ["Vegetarian", "Non-Vegetarian", "Vegan"]
    },
    minAge: {
        type: Number,
        default: 1,
        require: true
    },
    maxAge: {
        type: Number,
        default: 999
    },
    studyProgram: [{
        type: String,
        require: true
    }],
    canDrink: {
        type: Boolean,
        default: false
    },
    canSmoke: {
        type: Boolean,
        default: false
    },
    language: [{
        type: String,
        require: true
    }],
    canCook: {
        type: Boolean,
        default: false
    },
    nationality: [{
        type: String,
        require: true
    }],
    otherInfo: String,
    numberOfbeds: Number,
    numberOfBaths: Number,
    minPrice: Number,
    maxPrice: Number,
    aptStartDate: Date,
    aptEndDate: Date,
},{
    timestamps: true
});

// Export the Mongoose model
module.exports = mongoose.model('RoommatePreference', RoomatePreference);
