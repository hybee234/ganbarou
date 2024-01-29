import { useState, useEffect } from 'react';
import {
    Container,
    Col,
    Form,
    Button,
    Card,
    Row
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from './../utils/mutations'

const SearchBooks = () => {
    // create state for holding returned google api data
    const [searchedBooks, setSearchedBooks] = useState([]);
    // create state for holding our search field data
    const [searchInput, setSearchInput] = useState('');

    // create state to hold saved bookId values
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => saveBookIds(savedBookIds);
    });

    // create method to search for books and set state on form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchGoogleBooks(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();
            // console.log("Google response", items)

            const bookData = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description || 'No Description Available',
                image: book.volumeInfo.imageLinks?.thumbnail || '',
                // [HL] added this one in
                link: book.volumeInfo.previewLink
            }));

            // Google response mapped into new array
            console.log("bookData", bookData)

            setSearchedBooks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // Bring GraphQL query in with useMutation Hook
    const [SaveBook, { error }] = useMutation(SAVE_BOOK);

    // create function to handle saving a book to our database
    const handleSaveBook = async (bookId) => {
        
        // find the book in `searchedBooks` state by the matching id
        const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
        // console.log('bookToSave', bookToSave)

        try {
            const { data } = await SaveBook({
                variables: {
                    book: bookToSave,
                }
            })

            // Data provides the "saveBook JSON array"
            console.log("data", data)

            // Save Book ID to local storage
            setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        } catch (err) {
        // console.error(err);
        console.log(JSON.stringify(err, null, 2)); //Much better error reporting for GraphQl issues
        }
    };


    return (
        <>
            <div className="text-light bg-dark p-5">
                <Container>
                    <h1>Search for Books!</h1>
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                            name='searchInput'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type='text'
                            size='lg'
                            placeholder='Search for a book'
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <Button type='submit' variant='success' size='lg'>
                                Submit Search
                            </Button>
                        </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

            <Container>
                <h2 className='pt-5'>
                    {searchedBooks.length
                        ? `Viewing ${searchedBooks.length} results:`
                        : 'Search for a book to begin'}
                </h2>
                <Row>
                {searchedBooks.map((book) => {
                    return (
                    <Col md="4" key={book.bookId}>
                        <Card border='dark'>
                            {book.image ? (
                                <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title><Link to={book.link} target="_blank">{book.title}</Link></Card.Title>
                                <p className='small'>Authors: {book.authors}</p>
                                <Card.Text>{book.description}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                                        className='btn-block btn-info'
                                        onClick={() => handleSaveBook(book.bookId)}>
                                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                                        ? 'This book has already been saved!'
                                        : 'Save this Book!'}
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    );
                })}
                </Row>
            </Container>
        </>
    );
};

export default SearchBooks;
