const mongoose = require("mongoose");

// const postSchema = mongoose.Schema({
    const AparmentModel = new mongoose.Schema({
    address: String,
    nbedrooms: String,
    typeofplace: String,
    pricepermonth: String,
    nroomates: String,
    collegename: String,
    photos: [String],
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    id: String,
    typeofpost: String,
    username: String,
    max: String,
    min: String,
    wanttolive: String,
    promote: String,
    route: String,
})

module.exports = mongoose.model("AparmentModel", AparmentModel);