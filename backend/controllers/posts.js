//import express from 'express';
const express = require('express')

//import mongoose from 'mongoose';
const mongoose = require('mongoose')

//import PostMessage from '../models/postMessage.js';
const PostMessage = require('../models/postMessage')
const AparmentModel = require('../models/Apartmentmodel')
const asyncHandler = require("express-async-handler");
//import Checkoutpost from '../models/Checkoutpost.js';
//const Checkoutpost = require('../models/Checkoutpost.js')

//import User from '../models/user.js';
//const User = require('../models/user')
 

const router = express.Router();

// export const createcheckoutPost = async (req, res) => {
//     const {cardname, selectedFile, tags, description} = req.body;
//     const newCheckoutpost = new Checkoutpost({cardname, selectedFile, tags, description})

//     try {
//         await newCheckoutpost.save();

//         res.status(201).json(newCheckoutpost);
//     } catch (error) {
//         res.status(409).json({cardname, selectedFile, tags, description});
//     }
// }

module.exports.getPosts = asyncHandler(async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        //const aparmentMessages = await PostMessage.find();        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
module.exports.getApartmentPosts = asyncHandler(async (req, res) => {
    try {
        const apartmentMessages = await AparmentModel.find();
        //const aparmentMessages = await PostMessage.find();        
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports.getPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports.createApartmentPost = async (req, res) => {
    const {address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos,description,id,typeofpost,username} = req.body;
    console.log(photos + "photos");
    const newPostMessage = new PostMessage({address,nbedrooms,typeofplace,pricepermonth,nroomates,collegename,photos,description,id,typeofpost,username})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({address,nbedrooms,typeofplace,pricepermonth,nroomates,collegename,photos,description,id,typeofpost,username});
    }
}

// module.exports.createPost = async (req, res) => {
//     const {title, selectedFile, wanttolive, min, max, tags, description, id, username} = req.body;
//     //console.log(username + "creating post with username");
//     const newPostMessage = new PostMessage({title, selectedFile, wanttolive, min, max, tags, description, id, username})

//     try {
//         await newPostMessage.save();

//         res.status(201).json(newPostMessage);
//     } catch (error) {
//         res.status(409).json({title, selectedFile, wanttolive, min, max, tags, description, id, username});
//     }
// }

module.exports.createPost = asyncHandler(async (req, res) => {
    const {title, selectedFile, wanttolive, min, max, tags, description, id, username,address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos,typeofpost} = req.body;
    if (typeofpost){
        if(typeofpost === 'Aparment'){
            const newPostMessage = new AparmentModel({address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos,description,id,typeofpost,username})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos,description,id,typeofpost,username});
    }

        }
    }else{
        const newPostMessage = new PostMessage({title, selectedFile, wanttolive, min, max, tags, description, id, username})

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({title, selectedFile, wanttolive, min, max, tags, description, id, username});
    }
    }
    //console.log(username + "creating post with username"); 
});



module.exports.deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
});

/*export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, selectedFile, discription, address} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {title, discription, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}
*/

// export default router;
