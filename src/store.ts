import { queryApi } from "@/services/queryApi"
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query/react"
import thunkMiddleware from "redux-thunk"
import uiSlice from "./app/slice/ui-slice"

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    [queryApi.reducerPath]: queryApi.reducer,
  },
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
