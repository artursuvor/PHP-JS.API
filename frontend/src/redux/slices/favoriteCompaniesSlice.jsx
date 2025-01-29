import { createSlice } from '@reduxjs/toolkit';

const favoriteCompaniesSlice = createSlice({
  name: 'favoriteCompanies',
  initialState: [],
  reducers: {
    addCompany: (state, action) => {
      // Проверяем, существует ли компания с таким ICO в списке
      const companyExists = state.some(company => company.ico === action.payload.ico);
      if (!companyExists) {
        state.push(action.payload); // Если не существует, добавляем компанию
      }
    },
    removeCompany: (state, action) => {
      return state.filter(company => company.ico !== action.payload.ico);
    },
  },
});

export const { addCompany, removeCompany } = favoriteCompaniesSlice.actions;
export default favoriteCompaniesSlice.reducer;
