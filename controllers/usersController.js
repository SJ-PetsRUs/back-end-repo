const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');

router.get('/', (req, res, next) => {
	User.find()
		.then((posts) => res.json(posts))
		.catch(next);
});
// SIGN UP
// POST /api/signup
router.post('/signup', async (req, res, next) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = await User.create({
			password: hashedPassword,
			email: req.body.email,
		});
		return res.status(201).json(newUser);
	} catch (error) {
		return next(error);
	}
});

// SIGN IN
// POST /api/signin
router.post('/login', (req, res, next) => {
	// find the user by their email
	User.findOne({ email: req.body.email })
		// if the user exists, create a JWT (token) for them
		.then((user) => createUserToken(req, user))
		// send back the token
		.then((token) => res.json({ token }))
		// else handle the error
		.catch(next);
});

module.exports = router;
