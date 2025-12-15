import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type VacanciesState } from '../../../types/vacancies';
import { fetchVacancies } from '../api/vacanciesApi';

const initialState: VacanciesState = {
  vacancies: [],
  loading: false,
  error: null,
  searchParams: {
    text: '',
    area: '',
    skills: ['TypeScript', 'React', 'Redux'],
  },
};

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = {
        ...state.searchParams,
        ...action.payload,
      };
    },
    resetSearch: (state) => {
      state.searchParams = initialState.searchParams;
      state.vacancies = [];
    },
    addSkill: (state, action) => {
      if (!state.searchParams.skills.includes(action.payload)) {
        state.searchParams.skills.push(action.payload);
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.searchParams.skills = state.searchParams.skills.filter(
        skill => skill !== action.payload
      );
    },
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

export const { 
  setSearchParams, 
  resetSearch, 
  addSkill, 
  removeSkill,
  clearVacancies 
} = vacanciesSlice.actions;
export default vacanciesSlice.reducer;