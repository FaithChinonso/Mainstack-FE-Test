"use client"
import moment from "moment"
import "react-loading-skeleton/dist/skeleton.css"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { formatNumberWithComma } from "../utils/helpers"
import { FormattedDataType, TransactionType } from "../utils/types"

const Chart = ({ walletData, transactionData }: any) => {
  const formattedData: FormattedDataType[] = transactionData?.map(
    (entry: TransactionType) => ({
      date: moment(entry?.date, "YYYY-MM-DD").format("MMM DD, yyyy"),
      deposit: entry?.type === "deposit" ? entry?.amount : 0,
      withdrawal: entry?.type === "withdrawal" ? entry?.amount : 0,
    })
  )
  const firstDate = formattedData?.[0]?.date
  const lastDate = formattedData?.[formattedData?.length - 1].date
  return (
    <div className="lg:w-4/5 w-full flex flex-col  h-[350px]">
      <div className="flex lg:mb-[100px] gap-16">
        <div>
          <h5 className="text-sm font-medium text-text mb-2">
            Available Balance
          </h5>
          <h1 className="md:text-4xl text-3xl font-bold text-dark">
            USD {formatNumberWithComma(walletData?.balance) || 0.0}
          </h1>
        </div>
        <button
          type="button"
          className="cursor-pointer text-base text-white font-semibold bg-dark  rounded-[24px] md:w-[167px] w-[120px] h-[50px]"
        >
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
