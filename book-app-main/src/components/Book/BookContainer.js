import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BookInfo from './BookInfo';
import BooksList from './BooksList';
import { getBooks } from '../../store/bookSlice';

import './book.css';

const PostContainer = () => {

  const {isLoading, books} = useSelector(state => state.books)


  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector(state => state.authSlice)
  

  useEffect(()=>{
    dispatch(getBooks())
  }, [dispatch])

  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList isLoading={isLoading} data={books} isLoggedIn={isLoggedIn}/>
        </div>
        <div className='col side-line'>
          <BookInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
