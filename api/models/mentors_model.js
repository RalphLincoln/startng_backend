// REQUIRING NPM MODULES
const mongoose = require("mongoose");


const mentorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    facebook: { type: String, required: true },
    twitter: { type: String, required: true },
})


module.exports = mongoose.model('Mentor', mentorSchema);
