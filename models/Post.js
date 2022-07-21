const mongoose = require('../db/connection');
const commentSchema = require('./Comment');

const postSchema = new mongoose.Schema(
	{
		title: String,
		body: String,
		votes: { type: Number, default: 0 },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		},
		comments: [commentSchema],
	},
	{
		timestamps: true,
	}
	//

	//
);

const Post = mongoose.model('Post', postSchema);

//  export the newly created model
module.exports = Post;
