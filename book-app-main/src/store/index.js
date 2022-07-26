
import { configureStore } from '@reduxjs/toolkit'
import books from "./bookSlice";
import authSlice from "./authSlice"

const Store = configureStore({
    reducer: {
      books,
      authSlice
    },
  })

export default Store
