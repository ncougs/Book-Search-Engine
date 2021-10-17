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
