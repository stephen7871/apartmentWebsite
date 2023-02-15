///import mongoose from 'mongoose';
const mongoose = require("mongoose");

// const postSchema = mongoose.Schema({
    const postSchema = new mongoose.Schema({
    title: String,
    selectedFile: String,
    tags: [String],
    description: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    id: String ,
    max: String,
    min: String,
    wanttolive: String,
    username: String,    
})

module.exports = mongoose.model("PostMessage", postSchema);

// var PostMessage = mongoose.model('PostMessage', postSchema);

// export default PostMessage;