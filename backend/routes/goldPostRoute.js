// import express from 'express';
//const express = require('express');

//import { getPosts, getPost, createPost, getUsers,deletePost} from '../controllers/posts.js';
const { getGoldPosts, createGoldPost} = require('../controllers/goldPost.js')



const router = require("express").Router();


router.route("/").get(getGoldPosts);
router.route("/").post(createGoldPost);



//router.get('/', getPosts);
// router.get('/', getUsers);
///router.post('/', createPost);



module.exports = router;