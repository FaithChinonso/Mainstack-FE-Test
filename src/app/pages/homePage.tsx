"use client"
import {
  useGetTransactionDataQuery,
  useGetWalletDataQuery,
} from "@/redux/services/queryApi"
import { AppDispatch } from "@/redux/store"
import Image from "next/image"
import { useMemo } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useDispatch, useSelector } from "react-redux"
import download from "../../assets/images/download.svg"
import arrow from "../../assets/images/expand_more.svg"
import { uiActions } from "../../redux/features/ui-slice"
import Chart from "../components/Chart"
import EmptyTable from "../components/EmptyTable"
import Filter from "../components/Filter"
import Stats from "../components/Stats"
import Table from "../components/Table"

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()
  const { type, status, startDate, endDate, period } = useSelector(
    (state: any) => state.filter
  )
  const { data: walletData, isLoading } = useGetWalletDataQuery()

  //   const [type, setType] = useState(["deposit", "withdrawal"])
  //   const [status, setStatus] = useState<string[]>(["pending", "successful"])
  //   const [startDate, setStartDate] = useState("2022-03-01")
  //   const [endDate, setEndDate] = useState("2022-03-03")

  // filter transactions by type status and date range (start and end date)
  const filteredTransactions = useMemo(() => {
    return period
      ? transactionData?.filter((transaction) => {
          return (
            type?.includes(transaction.type) &&
            status?.includes(transaction.status) &&
            transaction?.date >= startDate &&
            transaction?.date <= endDate
          )
        })
      : transactionData
  }, [transactionData, type, status, startDate, endDate])

  //   useEffect(() => {

  //   }, [])
  console.log("first", type, status, startDate, endDate, period)
  return (
    <div className="mt-[114px]  pl-[150px] pr-[150px]">
      {isTransactionLoading || isLoading ? (
        <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
          <p>
            <Skeleton count={1} width={871} height={350} />
          </p>
        </SkeletonTheme>
      ) : (
        <div className="flex justify-between   gap-[123px]  w-full ">
          <Chart walletData={walletData} transactionData={transactionData} />
          <Stats walletData={walletData} />
        </div>
      )}
      {isTransactionLoading ? (
        <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
          <p>
            <Skeleton count={1} width={871} height={350} />
          </p>
        </SkeletonTheme>
      ) : (
        <>
          <div className="w-full flex justify-between items-center mb-6 mt-[82px]">
            <div>
              <h2 className="text-dark font-bold text-2xl ">
                {filteredTransactions?.length} Transactions
              </h2>
              {period ? (
                <h6 className="text-text text-sm font-medium capitalize">
                  Your transactions for {period}
                </h6>
              ) : null}
            </div>
            <div className="flex gap-3">
              <div
                className="rounded-full bg-lightGrey px-5 py-3 flex justify-center items-center "
                onClick={() =>
                  dispatch(
                    uiActions?.openDrawerAndSetContent({
                      drawerContent: <Filter />,
                    })
                  )
                }
              >
                <h5 className="text-dark text-base font-semibold mr-1">
                  Filter
                </h5>
                <Image src={arrow} alt="down button" width={20} height={20} />
              </div>
              <div className="rounded-full bg-lightGrey px-5 py-3 flex justify-center items-center ">
                <h5 className="text-dark text-base font-semibold mr-1">
                  Export list
                </h5>
                <Image
                  src={download}
                  alt="down button"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          {filteredTransactions?.length ? (
            <Table data={filteredTransactions} />
          ) : (
            <EmptyTable />
          )}
        </>
      )}
    </div>
  )
}

export default HomePage
