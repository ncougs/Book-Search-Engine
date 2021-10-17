const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		email: String
		password: String
		savedBooks: [Book]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Book {
		authors: [String]
		description: String
		bookId: String
		image: String
		link: String
		title: String
	}

	type Query {
		users: [User]
		books: [Book]
	}
`;

module.exports = typeDefs;
