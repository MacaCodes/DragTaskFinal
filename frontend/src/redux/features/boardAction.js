import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

export const boardAction = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setBoards } = boardAction.actions

export default boardAction.reducer