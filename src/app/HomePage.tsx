"use client"
import { useGetTransactionDataQuery } from "@/services/queryApi"
import { AppDispatch } from "@/store"
import Image from "next/image"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { useDispatch } from "react-redux"
import download from "../assets/images/download.svg"
import arrow from "../assets/images/expand_more.svg"
import ParentContainer from "./ParentContainer"
import Filter from "./components/Filter"
import Table from "./components/Table"
import Chart from "./components/chart"
import Stats from "./components/stats"
import { uiActions } from "./slice/ui-slice"

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()
  return (
    <ParentContainer>
      <div className="mt-[114px]  pl-[150px] pr-[150px]">
        <div className="flex justify-between   gap-[123px]  w-full ">
          <Chart />
          <Stats />
        </div>
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
                  {transactionData?.length} Transactions
                </h2>
                <h6 className="text-text text-sm font-medium">
                  Your transactions for the last 7 days
                </h6>
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
                  <h5 className="text-dark text-base font-semibold">Filter</h5>
                  <Image src={arrow} alt="down button" width={20} height={20} />
                </div>
                <div className="rounded-full bg-lightGrey px-5 py-3 flex justify-center items-center ">
                  <h5 className="text-dark text-base font-semibold">Export</h5>
                  <Image
                    src={download}
                    alt="down button"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
            <Table />
          </>
        )}
      </div>
    </ParentContainer>
  )
}

export default HomePage
