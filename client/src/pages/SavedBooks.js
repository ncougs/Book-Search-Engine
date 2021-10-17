import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_USER } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

import {
	Jumbotron,
	Container,
	Card,
	CardColumns,
	Button,
} from 'react-bootstrap';

const SavedBooks = () => {
	const {
		data: { _id },
	} = Auth.getProfile();

	const [userData, setUserData] = useState({});

	const { loading, error, data, refetch } = useQuery(SINGLE_USER, {
		variables: { id: _id },
		onCompleted: setUserData,
	});

	useEffect(() => {
		const userData = data?.getSingleUser;
		setUserData(userData);
	});

	const [deleteBook] = useMutation(DELETE_BOOK);

	const handleDeleteBook = async (bookId) => {
		const {
			data: { _id },
		} = Auth.getProfile();

		try {
			const { data } = await deleteBook({
				variables: {
					userID: _id,
					bookId,
				},
			});

			setUserData(data.deleteBook);
		} catch (err) {
			console.error(err);
		}
	};

	// if data isn't here yet, say so
	if (loading) {
		return <h2>LOADING...</h2>;
	}

	return (
		<>
			<Jumbotron fluid className='text-light bg-dark'>
				<Container>
					<h1>Viewing saved books!</h1>
				</Container>
			</Jumbotron>
			<Container>
				<h2>
					{userData?.savedBooks?.length
						? `Viewing ${userData.savedBooks.length} saved ${
								userData.savedBooks.length === 1 ? 'book' : 'books'
						  }:`
						: 'You have no saved books!'}
				</h2>
				<CardColumns>
					{userData?.savedBooks?.map((book) => {
						return (
							<Card key={book.bookId} border='dark'>
								{book.image ? (
									<Card.Img
										src={book.image}
										alt={`The cover for ${book.title}`}
										variant='top'
									/>
								) : null}
								<Card.Body>
									<Card.Title>{book.title}</Card.Title>
									<p className='small'>Authors: {book.authors}</p>
									<Card.Text>{book.description}</Card.Text>
									<Button
										className='btn-block btn-danger'
										onClick={() => handleDeleteBook(book.bookId)}
									>
										Delete this Book!
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</CardColumns>
			</Container>
		</>
	);
};

export default SavedBooks;
