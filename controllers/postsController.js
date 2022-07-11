const express = require('express');
const router = express.Router();
const {
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');
const Post = require('../models/Post');

// GET (index) /api/Posts/
router.get('/', (req, res, next) => {
	Post.find()
		.then((posts) => res.json(posts))
		.catch(next);
});

// GET (show) /api/Posts/5eb579b99b05e67b897e860b
router.get('/:id', async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id);
		if (handleRecordExists(post)) {
			return res.json(post);
		}
	} catch (error) {
		return next();
	}
});

// POST (create) /api/Posts/
router.post('/', requireToken, (req, res, next) => {
	Post.create(req.body)
		.then((post) => res.status(201).json(post))
		.catch(next);
});

// PUT (update) /api/Posts/5eb579b99b05e67b897e860b
router.put('/:id', requireToken, async (req, res, next) => {
	try {
		// find the document being requested
		const post = await Post.findById(req.params.id);
		// validate ownership
		if (handleValidateOwnership(req, post)) {
			// if valid owner, then update the document
			Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
				new: true,
			})
				.then((post) => res.json(post))
				.catch(next);
		}
	} catch (error) {
		next(error);
	}
});

// DELETE (delete) /api/Posts/5eb579b99b05e67b897e860b
router.delete('/:id', requireToken, (req, res, next) => {
	Post.findOneAndDelete({
		_id: req.params.id,
	})
		.then(() => res.sendStatus(204))
		.catch(next);
});

module.exports = router;
