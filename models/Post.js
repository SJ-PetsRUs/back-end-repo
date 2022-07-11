const mongoose = require('../db/connection');

const postSchema = new mongoose.Schema(
	{
		title: String,
		body: String,
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model('Post', postSchema);

//  export the newly created model
module.exports = Post;
