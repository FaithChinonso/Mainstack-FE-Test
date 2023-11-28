/* eslint-disable react/jsx-no-undef */
import { useGetTransactionDataQuery } from "@/services/queryApi"
import Image from "next/image"
import { useEffect, useState } from "react"
import arrow from "../../assets/images/expand_more.svg"
import { duration } from "../utils"
const Filter = () => {
  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()

  const [startDate, setStartDate] = useState<string>("Enter start date")
  const [endDate, setEndDate] = useState<string>("Enter end date")
  const [transactionTypes, setTransactionTypes] = useState<any[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    if (transactionData) {
      const uniqueTypes = [
        ...new Set(transactionData?.map((item) => item?.type)),
      ]
      setTransactionTypes(uniqueTypes)
    }
  }, [transactionData])

  const DropDown = () => (
    <div>
      {transactionTypes?.map((item, index) => (
        <h5 key={index}>{item}</h5>
      ))}
    </div>
  )

  return (
    <div className="py-5 px-6 w-full ">
      <div className="flex mb-6">
        <div className="font-bold text-dark text-2xl">Filter</div>
      </div>
      <div className="flex items-center justify-center max-w-[90%] overflow-x-auto gap-3  px-3 mb-6">
        {duration?.map((item, index) => (
          <div
            key={item?.id}
            className="rounded-full border border-faintBorder flex items-center justify-center px-[18px] py-[10px] "
          >
            <p className="text-dark text-sm font-semibold whitespace-nowrap ">
              {item?.name}
            </p>
          </div>
        ))}
      </div>
      <h3 className="text-base text-dark font-semibold mb-3">Date Range</h3>
      <div className="w-full flex gap-2">
        <div className="flex-1 bg-lightGrey flex justify-between items-center p-3 rounded-xl">
          <h3>{startDate}</h3>
          <div className="w-5 h-5 relative">
            <Image
              src={arrow}
              width={20}
              height={20}
              alt="dropdown"
              className="absolute top-0"
            />
            <input
              type="date"
              className="opacity-0 z-20 bg-green w-full h-5"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 bg-lightGrey flex justify-between items-center p-3 rounded-xl">
          <h3>{endDate}</h3>
          <div className="w-5 h-5 relative">
            <Image
              src={arrow}
              width={20}
              height={20}
              alt="dropdown"
              className="absolute top-0"
            />
            <input
              type="date"
              className="opacity-0 z-20 bg-green w-full h-5"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <h3 className="text-base text-dark font-semibold mb-3">
        Transaction Type
      </h3>
      <div>
        <h3 onClick={() => setOpenModal(!openModal)}>check</h3>
        {openModal ? <DropDown /> : null}
      </div>
    </div>
  )
}

export default Filter
