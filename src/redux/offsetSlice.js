import { createSlice } from '@reduxjs/toolkit';

export const offsetSlice = createSlice({
  name: 'offset',
  initialState: {
    count: 0,
  },
  reducers: {
    increase: (state) => {
      state.count += 10;
    },
    descrease: (state) => {
      state.count -= 10;
    },
    clear: (state) => {
      state.count = 0;
    },
  },
});

export const { increase, descrease, clear } = offsetSlice.actions;

export default offsetSlice.reducer;