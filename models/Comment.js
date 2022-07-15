//models/review.js
const mongoose = require('../db/connection');

const commentSchema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: true,
		},
		commentator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
        
	},
	{
		timestamps: true,
	}
);

module.exports = commentSchema;
