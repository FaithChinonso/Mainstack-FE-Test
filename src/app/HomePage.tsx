"use client"
import Image from "next/image"
import download from "../assets/images/download.svg"
import arrow from "../assets/images/expand_more.svg"
import ParentContainer from "./ParentContainer"
import Table from "./components/Table"
import Chart from "./components/chart"
import Stats from "./components/stats"

const HomePage = () => {
  return (
    <ParentContainer>
      <div className="flex justify-between  mt-[100px]  pl-[150px] pr-[150px] pt-[100px] gap-[123px]  w-full ">
        <Chart />
        <Stats />
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <h2 className="text-dark font-bold text-2xl ">24 Transactions</h2>
          <h6 className="text-text text-sm font-medium">
            Your transactions for the last 7 days
          </h6>
        </div>
        <div className="flex">
          <div className="rounded-full bg-lightGrey px-5 py-3 flex justify-center items-center ">
            <h5 className="text-dark text-base font-semibold">Filter</h5>
            <Image src={arrow} alt="down button" width={20} height={20} />
          </div>
          <div className="rounded-full bg-lightGrey px-5 py-3 flex justify-center items-center ">
            <h5 className="text-dark text-base font-semibold">Export</h5>
            <Image src={download} alt="down button" width={20} height={20} />
          </div>
        </div>
      </div>
      <Table />
    </ParentContainer>
  )
}

export default HomePage
