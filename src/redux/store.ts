import { configureStore } from '@reduxjs/toolkit'
import fitnessCentersReducer from './features/fitnessCentersSlice'
import membersReducer from './features/membersSlice'

export const store = () => {
  return configureStore({
    reducer: {
      fitnessCentersReducer,
      membersReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']