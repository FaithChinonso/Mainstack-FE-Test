"use client"
import { uiActions } from "@/redux/features/ui-slice"
import {
  useGetTransactionDataQuery,
  useGetWalletDataQuery,
} from "@/redux/services/queryApi"
import { AppDispatch } from "@/redux/store"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { useDispatch, useSelector } from "react-redux"
import download from "../assets/images/download.svg"
import arrow from "../assets/images/expand_more.svg"
import Chart from "./components/Chart"
import EmptyTable from "./components/EmptyTable"
import Filter from "./components/Filter"
import ParentContainer from "./components/ParentContainer"
import Stats from "./components/Stats"
import Table from "./components/Table"
import { TransactionType } from "./utils/types"

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])

  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()
  const { data: walletData, isLoading } = useGetWalletDataQuery()

  const { type, status, startDate, endDate, period } = useSelector(
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
    const handleWindowResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowSize([width, height])

      console.log(width, height)
    }

    window.addEventListener("resize", handleWindowResize)

    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])
  console.log("first", type, status, startDate, endDate, period)
  return (
    <ParentContainer>
      <div className="p-4  mt-[80px]  md:mt-[114px] md:pl-[150px] md:pr-[150px]  ">
        <div className="flex flex-col md:flex-row justify-between gap-[80px]  md:gap-[123px]  w-full ">
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
                <Skeleton count={5} width={271} height={350} />
              </p>
            </SkeletonTheme>
          ) : (
            <Stats walletData={walletData} />
          )}
        </div>
        {isTransactionLoading ? (
          <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
            <p>
              <Skeleton count={5} width={600} height={350} />
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
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </ParentContainer>
  )
}
