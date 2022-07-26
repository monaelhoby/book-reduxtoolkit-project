import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


export const getBooks = createAsyncThunk('books/fetchBooks', async (args, thunkAPI) => {
    const {rejectWithValue} = thunkAPI; //handle error in correct way
    try{
        const res = await fetch('http://localhost:3009/books');
        const data = await res.json();
        // console.log("data",data)
        return data
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const insertBook = createAsyncThunk('books/insertBook', async (bookData, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI; 
    bookData.userName= getState().authSlice.name
    try{
        const res = await fetch('http://localhost:3009/books',{
            method: "POST",
            body: JSON.stringify(bookData),
            headers: {'Content-type': 'application/json;charset=UTF-8'}
        });
        const data = await res.json();
        // console.log("data",data)
        return data
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const deleteBook = createAsyncThunk('books/deleteBook', async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI; 
    try{
        await fetch('http://localhost:3009/books/'+id,{
            method: "DELETE",
            headers: {'Content-type': 'application/json;charset=UTF-8'}
        });
        return id
    }catch(error){
        return rejectWithValue(error.message)
    }
})

export const readBook = createAsyncThunk('books/readBook', async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI; 
    try{
        await fetch('http://localhost:3009/books/'+id,{
            method: "POST",
            headers: {'Content-type': 'application/json;charset=UTF-8'}
        });
        return id
    }catch(error){
        return rejectWithValue(error.message)
    }
})

const bookSlice = createSlice({
    name: "books",
    initialState: {books: [], isLoading: false, error: null, readBook: null},
    extraReducers:{ // listen to any function outside slice
        //gitBooks
        [getBooks.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books = action.payload
            state.error = null
        },
        [getBooks.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        //insertBooks
        [insertBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [insertBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books.push(action.payload) 
        },
        [insertBook.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        //delete book
        [deleteBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.books= state.books.filter(book => book.id !== action.payload)
        },
        [deleteBook.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        //read book
        [readBook.pending]: (state, action) => {
            state.isLoading = true
            state.error = null
        },
        [readBook.fulfilled]: (state, action) => {
            state.isLoading = false
            state.readBook= state.books.find(book => book.id === action.payload)
        },
        [readBook.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})


export default bookSlice.reducer