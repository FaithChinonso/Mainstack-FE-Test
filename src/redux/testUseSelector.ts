import { queryApi } from "./services/queryApi"

export const state = {
  ui: {
    drawerContent: "",
    drawerStyles: {},
    drawerOpened: false,
    loaderOpened: false,
    toastOpened: false,
    toastContent: "",
  },
  filter: {
    period: null,
    endDate: null,
    startDate: null,
    status: null,
    type: null,
  },
  [queryApi.reducerPath]: queryApi.reducer,
}

export const testUseSelector: any = (f: any) => f(state)
