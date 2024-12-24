// src/redux/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  salaryRange: 0,
  maxSalary: 10000,
  workLocation: '',
  experience: '',
  perMonth: '',
  jobRole: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSalaryRange: (state, action) => {
      state.salaryRange = action.payload;
    },
    setWorkLocation: (state, action) => {
      state.workLocation = action.payload;
    },
    setExperience: (state, action) => {
      state.experience = action.payload;
    },
    setPerMonth: (state, action) => {
      state.perMonth = action.payload;
    },
    setJobRole: (state, action) => {
      state.jobRole = action.payload;
    },
  },
});

export const {
  setSalaryRange,
  setWorkLocation,
  setExperience,
  setPerMonth,
  setJobRole,
} = filtersSlice.actions;

export default filtersSlice.reducer;
