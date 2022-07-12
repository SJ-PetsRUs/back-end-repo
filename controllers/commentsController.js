// controllers/reviews.js
const express = require('express');
const router = express.Router();

// require comment model
const Comment = require('./../models/Comment');
const Post = require('../models/Post');

// CREATE
// POST /comments/
router.post('/', (req, res, next) => {
	// get the review data from the body of the request
	const newComment = req.body;
	// get the comment id from the body
	const postId = newComment.postId;
	// find the comment by its id
	Post.findById(postId)
		.then((post) => {
			// add review to comment
			post.comments.push(newComment);
			// save comment
			// https://mongoosejs.com/docs/api.html#model_Model-save
			return post.save();
		})
		// send response back to client
		.then((updatedPost) => {
			res.json(updatedPost);
		})
		.catch(next);
});

// DESTROY
// DELETE /comments/:id
router.delete('/:id', (req, res, next) => {
	//save id of review to delete
	const commentID = req.params.id;
	//find the comment by looking for the one that has an id that matches the current review id
	Post.findOne({ 'comments._id': commentID })
		.then((post) => {
			// https://mongoosejs.com/docs/api.html#mongoosedocumentarray_MongooseDocumentArray-id
			// https://mongoosejs.com/docs/api.html#model_Model.remove

			//remove the review from the array of reviews
			post.comments.id(commentID).remove();
			//write the changes to the reviews array to the database
			return post.save();
		})
		//send back 204 no content
		.then(() => res.sendStatus(204))
		.catch(next);
});

// UPDATE
// PATCH /comments/:id
router.patch('/:id', (req, res, next) => {
	//grab the review body
	const editedComment = req.body;
	//grab comment and review Ids
	const postId = req.body.postId;
	const commentId = req.params.id;

	//first find the comment that the review belongs to
	Post.findById(postId)
		.then((post) => {
			//identify the review that's being updated
			const commentToUpdate = post.comments.id(commentId);
			//update the body of the review
			commentToUpdate.set(editedComment);
			//write the changes to the database
			return post.save();
		})
		//send back the updated comment
		.then((post) => {
			res.json(post);
		})
		.catch(next);
});

module.exports = router;
