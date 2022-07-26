import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteBook, readBook } from '../../store/bookSlice';

const BooksList = ({isLoading, data, isLoggedIn}) => {
  const dispatch= useDispatch();
  const bookList = data.length > 0 ? data.map((item,key) => (
      <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
        <div>{item.title}</div>
        <div className='btn-group' role='group'>
          <button type='button' className='btn btn-primary' onClick={() => dispatch(readBook(item.id))}>
            Read
          </button>
          <button type='button' className='btn btn-danger' disabled={!isLoggedIn} 
          onClick={() => dispatch(deleteBook(item.id))}>
            Delete
          </button>
        </div>
      </li>
  )) : "There is no books"
  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading ? "Loading..." 
        : (<ul className='list-group'>{bookList}</ul>)
      }
    </div>
  );
};

export default BooksList;
