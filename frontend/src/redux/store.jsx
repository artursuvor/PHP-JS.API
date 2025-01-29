import { configureStore } from '@reduxjs/toolkit';
import favoriteCompaniesReducer from './slices/favoriteCompaniesSlice';

const store = configureStore({
  reducer: {
    favoriteCompanies: favoriteCompaniesReducer,
  },
});

export default store; 
