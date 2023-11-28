import { useGetTransactionDataQuery } from "@/services/queryApi"
import moment from "moment"
import Image from "next/image"
import Decreasing from "../../assets/images/call_made.svg"
import Increasing from "../../assets/images/call_received.svg"

import { formatNumberWithComma, getStatusColor } from "../helpers"
import { TransactionType } from "../types"

const Table = () => {
  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()

  return (
    <table className="w-full mt-8">
      <tbody>
        {transactionData?.map((item: TransactionType, index) => {
          console.log("stat", getStatusColor(item?.status).toString())
          return (
            <tr key={index} className="flex mb-6 ">
              <td>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                    item?.type === "deposit" ? "bg-lightGreen" : "bg-lightRed"
                  }`}
                >
                  <Image
                    src={item?.type === "deposit" ? Increasing : Decreasing}
                    width={20}
                    height={20}
                    alt=""
                  />
                </div>
              </td>
              <td className="flex-1">
                <h2 className="text-base text-dark font-medium">
                  {item?.type === "deposit"
                    ? item?.metadata?.product_name || ""
                    : "Cash Withdrawal"}
                </h2>
                {item?.type === "deposit" ? (
                  <h5 className={`capitalize text-text text-sm font-medium`}>
                    {item?.metadata?.name}
                  </h5>
                ) : (
                  getStatusColor(item?.status)
                )}
              </td>
              <td className="items-end">
                {" "}
                <h2 className="text-base text-dark font-bold text-end">{`USD ${formatNumberWithComma(
                  item?.amount
                )}`}</h2>
                <h5 className="text-sm text-text font-medium text-end">
                  {moment(item?.date, "YYYY-MM-DD").format("MMM DD, yyyy")}
                </h5>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
