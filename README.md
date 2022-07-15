# Redoit

## Description

This is the backend for [Redoit](https://redoit.netlify.app/), a Full Stack (MERN) social media application designed to let users share their thoughts and interact with other users via comments, up voting and down voting. It is an Express API and is deployed using Heroku. It provides CRUD functionality to the front end of the application to allow users to create/edit/delete posts and comments.

## Technologies Used

- Express
- Node.js
- MongoDB
- Mongoose

## Installation Instructions

1. Clone this repository to your lessons folder and change directory into it.
2. Run `npm i` to download required dependencies.
3. Create a .env file and add your `DATABASE_URL` to it with your MongoDB Atlas connection string.

## Getting Started

1. Run `node db/seed.js` to populate your database with seed data.
2. Run `nodemon index.js` to start your development server.
   Happy coding!!!!

## API Endpoints

**Posts**

- GET: api/posts
- POST: api/posts
- PATCH: api/posts/:id

**Comments**

- GET: /comments
- POST: /comments
- DELETE: /comments/:id

**Users**

- GET: api/users
- POST: api/users/signup

_To see our deployed backend API, click [here](https://redoit-api.herokuapp.com/api/users)_
