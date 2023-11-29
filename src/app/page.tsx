"use client"
import { uiActions } from "@/redux/features/ui-slice"
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks"
import {
  useGetTransactionDataQuery,
  useGetWalletDataQuery,
} from "@/redux/services/queryApi"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import download from "../assets/images/download.svg"
import arrow from "../assets/images/expand_more.svg"

import EmptyTable from "./components/EmptyTable"
import Filter from "./components/Filter"
import ParentContainer from "./components/ParentContainer"
import Table from "./components/Table"
import Chart from "./components/chart"
import Stats from "./components/stats"
import { TransactionType } from "./utils/types"

export default function Home() {
  if (typeof window === "undefined") {
    return <></>
  }
  const dispatch = useAppDispatch()
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])

  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()
  const { data: walletData, isLoading } = useGetWalletDataQuery()

  const { type, status, startDate, endDate, period } = useAppSelector(
    (state: any) => state.filter
  )
  const filteredTransactions = useMemo(() => {
    return period
      ? transactionData?.filter((transaction: TransactionType) => {
          return (
            type?.includes(transaction.type) &&
            status?.includes(transaction.status) &&
            transaction?.date >= startDate &&
            transaction?.date <= endDate
          )
        })
      : transactionData
  }, [period, transactionData, type, status, startDate, endDate])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        setWindowSize([width, height])
      }

      window.addEventListener("resize", handleWindowResize)

      return () => {
        window.removeEventListener("resize", handleWindowResize)
      }
    }
  }, [])

  return (
    <ParentContainer>
      <div className="p-4 w-full  mt-[80px]  md:mt-[114px] md:pl-[150px] md:pr-[150px]  bg-white  2xl:max-w-[1440px]">
        <div className="flex flex-col lg:flex-row justify-between gap-[80px]  lg:gap-[123px]  w-full ">
          {isTransactionLoading || isLoading ? (
            <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
              <p>
                <Skeleton
                  count={2}
                  width={
                    windowSize[0] > 600
                      ? (windowSize[0] * 4) / 5
                      : windowSize[0]
                  }
                  height={350}
                />
              </p>
            </SkeletonTheme>
          ) : (
            <Chart walletData={walletData} transactionData={transactionData} />
          )}
          {isTransactionLoading || isLoading ? (
            <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
              <p>
                <Skeleton count={5} width={271} height={120} />
              </p>
            </SkeletonTheme>
          ) : (
            <Stats walletData={walletData} />
          )}
        </div>
        {isTransactionLoading ? (
          <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
            <p>
              <Skeleton count={5} width={windowSize[0]} height={350} />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2 mb-6 mt-10 md:mt-[82px]">
              <div>
                <h2 className="text-dark font-bold text-xl md:text-2xl  ">
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
                  {filteredTransactions?.length ? (
                    <div className="rounded-full w-5 h-5 flex items-center justify-center bg-dark mr-1">
                      <p className="text-white text-xs">
                        {filteredTransactions?.length}
                      </p>
                    </div>
                  ) : null}
                  <h5 className="text-dark md:text-base text-sm font-semibold mr-1">
                    Filter
                  </h5>
                  <Image src={arrow} alt="down button" width={20} height={20} />
                </div>
                <div className="rounded-full bg-lightGrey px-5 py-3 flex justify-center items-center ">
                  <h5 className="text-dark md:text-base text-sm font-semibold mr-1">
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
    </ParentContainer>
  )
}
