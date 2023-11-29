import { TransactionType, UserType, WalletType } from "@/app/utils/types"
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query/react"

interface CustomErr {
  data: {
    error: string
    message: any
    statusCode: number
  }
  status: number
}

const baseUrl = "https://fe-task-api.mainstack.io"

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json")

      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: (builder) => ({
    getWalletData: builder.query<WalletType | any, void>({
      query: () => {
        return {
          url: "/wallet",
        }
      },
    }),
    getUserData: builder.query<UserType | any, void>({
      query: () => {
        return {
          url: "/user",
        }
      },
    }),
    getTransactionData: builder.query<TransactionType[], void>({
      query: () => {
        return {
          url: "/transactions",
        }
      },
    }),
  }),
})

export const {
  useGetTransactionDataQuery,
  useGetUserDataQuery,
  useGetWalletDataQuery,
} = queryApi
