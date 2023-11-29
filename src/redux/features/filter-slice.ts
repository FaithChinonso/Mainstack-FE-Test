import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface filterState {
  period: string | null
  endDate: string | null
  startDate: string | null
  status: string[] | null
  type: string[] | null
}
// Define the initial state using that type
const initialState: filterState = {
  period: null,
  endDate: null,
  startDate: null,
  status: null,
  type: null,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addData(state, action: PayloadAction<any>) {
      return {
        ...state,
        period: action.payload.period,
        endDate: action.payload.endDate,
        startDate: action.payload.startDate,
        status: action.payload.status,
        type: action.payload.type,
      }
    },
  },
})
export const filterActions = filterSlice.actions

export default filterSlice.reducer
