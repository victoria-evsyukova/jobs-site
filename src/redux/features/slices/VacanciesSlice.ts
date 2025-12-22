import { createSlice } from '@reduxjs/toolkit';
import { type VacanciesState } from '../../../types/vacancies';
import { fetchVacancies } from '../api/vacanciesApi';

const initialState: VacanciesState = {
  vacancies: [],
  loading: false,
  error: null,
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    clearVacancies: (state) => {
      state.vacancies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action) => {
        state.loading = false;
        state.vacancies = action.payload;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      });
  },

});

export const { clearVacancies } = vacanciesSlice.actions;
export default vacanciesSlice.reducer;