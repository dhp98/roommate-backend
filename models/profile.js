var mongoose = require('mongoose');

// Define our user schema
var ProfileSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    foodPreference: String,
    DOB: {
        type: Date
    },
    studyProgram: { 
        type: String, enum: ['MSCS', 'MCS', 'Masters Mech', 'Masters Electrical'] 
    },
    drinking: {
        type: Boolean,
        default: false,
    },
    smoking: {
        type: Boolean,
        default: false,
    },
    language: {
        type: String, enum: ['Hindi', 'Gujrati', 'English', 'Mandrin', 'Marathi'] 
    },
    cookingSkills: { 
        type: String, enum: ["Amateur", "Intermediate", "Expert"] 
    },
    nationality: { 
        type: String
    },
    otherInfo: { 
        type: String
    }
},{
    timestamps: true
});

// Export the Mongoose model
module.exports = mongoose.model('Profile', ProfileSchema);
