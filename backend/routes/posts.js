// import express from 'express';
//const express = require('express');

//import { getPosts, getPost, createPost, getUsers,deletePost} from '../controllers/posts.js';
const {getPosts, getPost, createPost, deletePost, getApartmentPosts} = require('../controllers/posts.js')


const router = require("express").Router();


router.route('/').get(getPosts);
router.route('/').get(getApartmentPosts);
//router.get('/', getPosts);
// router.get('/', getUsers);
///router.post('/', createPost);
router.route('/').post(createPost);

router.route('/:id').get(getPost);
/// router.get('/:id', getPost);
//router.patch('/:id', updatePost);
router.route('/:id').delete(deletePost);
//router.delete('/:id', deletePost);
//router.patch('/:id/likePost', likePost);

//export default router;
module.exports = router;