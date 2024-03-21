import { createSlice } from '@reduxjs/toolkit'

const initialState = { boards: [] }

export const boardSlice = createSlice({
  name: 'boards',
  // changed from user to boards?
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
    }
  }
})

export const { setBoards } = boardSlice.actions

export default boardSlice.reducer
