import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FunctionComponent } from "react"

// Define a type for the slice state
interface uiState {
  drawerContent: string
  drawerStyles: {}
  drawerOpened: boolean
  loaderOpened: boolean
  toastOpened: boolean
  toastContent: string | Element | JSX.Element | FunctionComponent
}
// Define the initial state using that type
const initialState: uiState = {
  drawerContent: "",
  drawerStyles: {},
  drawerOpened: false,
  loaderOpened: false,
  toastOpened: false,
  toastContent: "",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openDrawerAndSetContent(state, action: PayloadAction<any>) {
      return {
        ...state,
        drawerOpened: true,
        drawerContent: action.payload.drawerContent,
      }
    },
    closedrawer(state) {
      return { ...state, drawerOpened: false }
    },
    openLoader(state) {
      return { ...state, loaderOpened: true }
    },
    closeLoader(state) {
      return { ...state, loaderOpened: false }
    },
    openToastAndSetContent(state, action: PayloadAction<any>) {
      return {
        ...state,
        toastOpened: true,
        backgroundColor: action.payload.backgroundColor,
        toastContent: action.payload.toastContent,
      }
    },
    closeToast(state) {
      return {
        ...state,
        toastOpened: false,
        toastContent: "",
      }
    },
  },
})
export const uiActions = uiSlice.actions

export default uiSlice.reducer
