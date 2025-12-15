
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vacanciesReducer from "../features/slices/VacanciesSlice";

const rootReducer = combineReducers({
  vacancy: vacanciesReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
} 


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']