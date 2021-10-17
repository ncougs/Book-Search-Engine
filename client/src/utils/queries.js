import { gql } from '@apollo/client';

export const SINGLE_USER = gql`
	query ($id: ID) {
		getSingleUser(id: $id) {
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
