import { queryApi } from "@/redux/services/queryApi"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query/react"
import { persistReducer } from "redux-persist"
import thunkMiddleware from "redux-thunk"
import filterSlice from "./features/filter-slice"

import uiSlice from "./features/ui-slice"

const reducers = combineReducers({
  ui: uiSlice,
  filter: filterSlice,

  [queryApi.reducerPath]: queryApi.reducer,
})

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunkMiddleware, queryApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
setupListeners(store.dispatch)
