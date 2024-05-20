import { configureStore } from '@reduxjs/toolkit'
import fitnessCentersReducer from './features/fitnessCentersSlice'
import membersReducer from './features/membersSlice'
import coachesReducer from './features/coachesSlice'
import roomsReducer from './features/roomsSlice'
import classesReducer from './features/classesSlice'

export const store = () => {
  return configureStore({
    reducer: {
      fitnessCentersReducer,
      membersReducer,
      coachesReducer,
      roomsReducer,
      classesReducer,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']