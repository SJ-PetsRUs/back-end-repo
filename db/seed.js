// Require the Book model
const Post = require('../models/Post');
const User = require('../models/User');

// Require the data
const seedPostData = require('./seedspost.json');
const seedUserData = require('./seedsuser.json');


// Delete any existing documents in the books collection
Post.deleteMany()
	// Use insertMany and pass it the seed data
	.then(() => Post.insertMany(seedPostData))
	// Log the successful results
	.then(console.log)
	// Log any errors if things didn't work
	.catch(console.error)
	// Use finally, so that this code will run whether or not
	// things worked and close our connection to the database.
	.finally(process.exit);


    User.deleteMany()
			// Use insertMany and pass it the seed data
			.then(() => User.insertMany(seedUserData))
			// Log the successful results
			.then(console.log)
			// Log any errors if things didn't work
			.catch(console.error)
			// Use finally, so that this code will run whether or not
			// things worked and close our connection to the database.
			.finally(process.exit);
