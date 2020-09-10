// REQUIRING NPM MODULES
const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: String, required: true },
    meant: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);