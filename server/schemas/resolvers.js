const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		//find all users
		users: async () => {
			return User.find({});
		},

		//find all books
		books: async () => {
			return Book.find({});
		},
	},

	Mutation: {
		//create a new user account
		createUser: async (parent, { username, email, password }) => {
			//get new user details
			const newUser = new User({
				username,
				email,
				password,
			});

			//save newUser to the database
			const user = await newUser.save();

			//create user token
			const token = signToken(user);

			//return token and user
			return { token, user };
		},
	},
};

module.exports = resolvers;
