import { configureStore } from "@reduxjs/toolkit"
import boardReducer from './features/boardSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
  }
})

// export const store = configureStore({
//     reducer: {
//       user: userReducer,
//       board: boardReducer,
//       favourites: favouriteReducer
//     }
//   })