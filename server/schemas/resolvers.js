const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		//find all users
		users: async () => {
			return User.find({});
		},

		//find single user
		getSingleUser: async (parent, { id, username }) => {
			const foundUser = await User.findOne({
				$or: [{ _id: id }, { username }],
			});

			if (!foundUser) {
				throw new AuthenticationError(`Cannot find user`);
			}

			return foundUser;
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

		//login to user account
		login: async (parent, { username, email, password }) => {
			//default error message
			const errorMessage = 'Incorrect username, email or password';

			//find the username within our db - Usernames are unqiue
			const user = await User.findOne({ $or: [{ username }, { email }] });

			//no username found, return error
			if (!user) {
				throw new AuthenticationError(errorMessage);
			}

			//check plain text password with hashed db password
			const validPassword = await user.isCorrectPassword(password);

			//passwords do not match, return error
			if (!validPassword) {
				throw new AuthenticationError(errorMessage);
			}

			//create user token
			const token = signToken(user);

			//return token and user
			return { token, user };
		},
	},
};

module.exports = resolvers;
