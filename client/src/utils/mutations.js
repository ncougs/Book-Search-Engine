import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation ($username: String, $email: String, $password: String!) {
		login(username: $username, email: $email, password: $password) {
			user {
				username
				email
			}
			token
		}
	}
`;

export const CREATE_USER = gql`
	mutation ($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			user {
				username
				email
			}
			token
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation (
		$userID: ID!
		$authors: [String]
		$description: String
		$bookId: String
		$image: String
		$link: String
		$title: String
	) {
		saveBook(
			userID: $userID
			authors: $authors
			description: $description
			bookId: $bookId
			image: $image
			link: $link
			title: $title
		) {
			_id
			username
			email
			password
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;

export const DELETE_BOOK = gql`
	mutation ($userID: ID!, $bookId: String) {
		deleteBook(userID: $userID, bookId: $bookId) {
			_id
			username
			email
			password
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;
