"use client"
import {
  useGetTransactionDataQuery,
  useGetWalletDataQuery,
} from "@/services/queryApi"
import moment from "moment"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { formatNumberWithComma } from "../helpers"
import { FormattedDataType, TransactionType } from "../types"

const Chart = () => {
  const { data: walletData, isLoading } = useGetWalletDataQuery()
  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()

  const formattedData: FormattedDataType[] = transactionData?.map(
    (entry: TransactionType) => ({
      date: moment(entry?.date, "YYYY-MM-DD").format("MMM DD, yyyy"),
      deposit: entry?.type === "deposit" ? entry?.amount : 0,
      withdrawal: entry?.type === "withdrawal" ? entry?.amount : 0,
    })
  )
  const firstDate = formattedData?.[0]?.date
  const lastDate = formattedData?.[formattedData?.length - 1].date
  return isLoading || isTransactionLoading ? (
    <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
      <p>
        <Skeleton count={1} width={871} height={350} />
      </p>
    </SkeletonTheme>
  ) : (
    <div className="w-4/5 flex flex-col ">
      <div className="flex mb-[100px] gap-16">
        <div>
          <h5 className="text-sm font-medium text-text mb-2">
            Available Balance
          </h5>
          <h1 className="text-4xl font-bold text-dark">
            USD {formatNumberWithComma(walletData?.balance)}
          </h1>
        </div>
        <button className="cursor-pointer text-base text-white font-semibold bg-dark px-7 py-[5px] rounded-[100px]">
          Withdraw
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            ticks={[firstDate, lastDate]}
            axisLine={{ stroke: "#DBDEE5" }}
            padding="gap"
          />
          <YAxis hide padding={{ top: 20, bottom: 20 }} />
          <Line
            type="monotone"
            dataKey="deposit"
            stroke="#102572"
            activeDot={false}
          />
          <Line
            type="monotone"
            dataKey="withdrawal"
            stroke="#FF5403"
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
