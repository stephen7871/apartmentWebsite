const express = require('express');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const GoldPostModel = require('../models/GoldPostModel')

//import mongoose from 'mongoose';
const mongoose = require('mongoose');

//import PostMessage from '../models/postMessage.js';
const Apartmentmodel = require('../models/Apartmentmodel')

const s3 = new aws.S3({
    accessKeyId: 'your key',
    secretAccessKey: 'your key',
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


module.exports.getGoldPosts = async (req, res) => { 
    try {
        const aparmentMessages = await GoldPostModel.find();
                
        res.status(200).json(aparmentMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports.createGoldPost = async (req, res) => {
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