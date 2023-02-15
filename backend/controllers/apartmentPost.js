//import express from 'express';
const express = require('express');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const GoldPostModel = require('../models/GoldPostModel')

//import mongoose from 'mongoose';
const mongoose = require('mongoose');

//import PostMessage from '../models/postMessage.js';
const Apartmentmodel = require('../models/Apartmentmodel')
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

const s3 = new aws.S3({
    accessKeyId: 'AKIAUTVZCIJBJRY6SLNJ',
    secretAccessKey: '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',
    region: 'us-east-1',
  });
  
  
  
  
  const upload = (bucketName) =>
    multer({
    
      storage: multerS3({
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
          cb(null, `image-${Date.now()}.jpeg`);
        },
      }),
    });

    // module.exports.createPost = (req, res, next) => {
    //     const uploadSingle = upload("stevenewbucket").single(
    //       "croppedImage"
    //     );
      
    //     uploadSingle(req, res, async (err) => {
    //       if (err)
    //         return res.status(400).json({ success: false, message: err.message });
      
    //       await Apartmentmodel.create({ photos: req.file.location });
      
    //       res.status(200).json({ data: req.file.location });
    //     });
    //   };

//   const uploadedImage = await s3.upload({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: req.files[0].originalFilename,
//     Body: blob,
//   }).promise()


// const s3 = new aws.S3({
//     accessKeyId: 'AKIAUTVZCIJBJRY6SLNJ',
//     secretAccessKey: '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',
// })
module.exports.getPosts = async (req, res) => { 
    try {
        const aparmentMessages = await Apartmentmodel.find();
        res.status(200).json(aparmentMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports.getGoldPosts = async (req, res) => { 
    try {
        const aparmentMessages = await GoldPostModel.find();
                
        res.status(200).json(aparmentMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports.getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Apartmentmodel.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}





module.exports.createPost = async (req, res) => {
    //const {address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos,description,id,typeofpost,username, max,min,wanttolive} = req.body;
    
    const uploadSingle = upload("stevenewbucket").array( 'imagecropped', 3 );
      uploadSingle(req, res, async (err) => {
        if (err)
          return res.status(400).json({ success: false, message: err.message });

          
    //console.log(username + "creating post with username");
    // const newPostMessage = new Apartmentmodel({address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos: req.files.location,description,id,typeofpost,username, max,min,wanttolive})

    try {
        // await newPostMessage.save();

        let fileArray = req.files,
					fileLocation;
        const photos = req.body.photos
        const typeofpromote = req.body.typeofpromote
        const caption = req.body.address
        const nbedrooms = req.body.nbedroomss
        const pricepermonth = req.body.pricepermonth
        const description = req.body.description
        const username = req.body.username
        const typeofplace = req.body.typeofplace
        const typeofpost = req.body.typeofpost
        const collegename = req.body.collegename
        const min = req.body.min
        const max = req.body.max
        const wanttolive = req.body.wanttolive
        const nroomates = req.body.nroomates
        const galleryImgLocationArray = [];
				for ( let i = 0; i < fileArray.length; i++ ) {
					fileLocation = fileArray[ i ].location;
					// console.log( 'filenm', fileLocation );
                    // console.log( 'filearray', JSON.stringify(fileArray) );
					galleryImgLocationArray.push( fileLocation )
				}
    

 if (typeofpromote == "1"){
    await GoldPostModel.create({photos: galleryImgLocationArray, 
        address: caption,
        nbedrooms: nbedrooms,
        typeofplace: typeofplace,
        pricepermonth: pricepermonth,
        nroomates: nroomates,
         collegename: collegename,
        description: description,
        typeofpost: typeofpost,
        username: username,
         max: max,
         min: min,
        wanttolive: wanttolive,
        promote: 1,
        photos: photos,
        route: 'goldposts'

    });

 }

 if(typeofpromote == "4"){
    await Apartmentmodel.create({photos: galleryImgLocationArray, 
        address: caption,
        nbedrooms: nbedrooms,
        typeofplace: typeofplace,
        pricepermonth: pricepermonth,
        nroomates: nroomates,
         collegename: collegename,
        description: description,
        typeofpost: typeofpost,
        username: username,
         max: max,
         min: min,
        wanttolive: wanttolive,
        route: 'posts'
    });
 }
            
        

        // res.json( {
        //     filesArray: fileArray,
        //     locationArray: galleryImgLocationArray
        // } );
            
            // await Apartmentmodel.create({ photos: photo.location });
        //    res.status(200).json({ photos: address});

        // res.status(201).json(newPostMessage);
    } catch (error) {
        // res.status(409).json({address,nbedrooms,typeofplace,pricepermonth,nroomates: String,collegename,photos,description,id,typeofpost,username, max,min,wanttolive});
        res.status(409).json({filesArray: fileArray});
    }
});
};


module.exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Apartmentmodel.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const {photos: galleryImgLocationArray, 
//         address: caption,
//         nbedrooms: nbedrooms,
//         typeofplace: typeofplace,
//         pricepermonth: pricepermonth,
//         nroomates: nroomates,
//          collegename: collegename,
//         description: description,
//         typeofpost: typeofpost,
//         username: username,
//          max: max,
//          min: min,
//         wanttolive: wanttolive
//         promote: promote
//     } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

//     const updatedPost = {title, discription, selectedFile, _id: id };

//     await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

//     res.json(updatedPost);
// }

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
