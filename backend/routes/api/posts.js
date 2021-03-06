const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Post model
const Post = require('../../models/Post');
// Load Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');



// @route GET api/posts
// @desc Get all post
// @access Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}));
})



// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ postnotfound: 'Post not found with this ID' }));
})



// @route Post api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});



// @route Delete api/posts/:id
// @desc Delete post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if(post.user.toString() !== req.user.id)
                        return res.status(401).json({ notauthorized: 'User not authorized'});

                    post.remove().then(() =>  res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
        })
});



// @route Post api/posts/like/:id
// @desc Like a post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check if user already liked
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0)
                        return res.status(400).json({ alreadyliked: 'User already liked this post' });

                    // Add user to liked array
                    post.likes.unshift({ user: req.user.id });

                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
        })
});



// @route Post api/posts/unlike/:id
// @desc Unlike a post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check if user already liked
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0)
                        return res.status(400).json({ notliked: 'User has not liked this post' });

                    // Get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // Splice out of the array
                    post.likes.splice(removeIndex, 1);

                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
        })
});



// @route Post api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post('/common/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.body.user
            };

            // Add to comments array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
});

// @route Delete api/posts/comment/:id/:comment_id
// @desc Delete a comment
// @access Private
router.delete('/common/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    Post.findById(req.params.id)
        .then(post => {
            // Check if comment exists
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({commentnotexist: 'Comment does not exist'})
            } else {
                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comment.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            }
            })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}));
});


module.exports = router;