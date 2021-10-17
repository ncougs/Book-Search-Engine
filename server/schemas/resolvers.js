const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');

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
};

module.exports = resolvers;
