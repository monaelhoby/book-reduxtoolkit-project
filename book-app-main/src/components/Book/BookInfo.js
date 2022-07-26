import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const BookInfo = () => {

  const selectedBook = useSelector(state => state.books.readBook)
  // console.log(selectedBook)
  return (
    <Fragment>
      <h2>Book Details</h2>
      {
        selectedBook ? (
          <div>
        <p className='fst-italic'> this book is created by {selectedBook.userName}</p>
        <p className='fw-bold'>Title: {selectedBook.title}</p>
        <p className='fw-light'>Description: {selectedBook.description}</p>
        <p className='fst-italic'>Price: {selectedBook.price}</p>
      </div>
        ) : (
          <div className='alert alert-secondary' role='alert'>
            There is no post selected yet. Please select!
          </div>
        )
      }
      
    </Fragment>
  );
};

export default BookInfo;
