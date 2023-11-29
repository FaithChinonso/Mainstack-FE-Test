/* eslint-disable react/jsx-no-undef */
import { useGetTransactionDataQuery } from "@/redux/services/queryApi"

import { useAppDispatch } from "@/redux/redux-hooks"
import moment from "moment"
import Image from "next/image"
import { useEffect, useState } from "react"
import down from "../../assets/images/expand_more (1).svg"
import up from "../../assets/images/upward.svg"
import { filterActions } from "../../redux/features/filter-slice"
import { uiActions } from "../../redux/features/ui-slice"
import { duration } from "../utils/data"
import { splitArray } from "../utils/helpers"
import CheckboxList from "./Checkbox"
import DatePicker from "./DatePicker"
const Filter = () => {
  const dispatch = useAppDispatch()
  const now = moment().format("YYYY-MM-DD")

  const { data: transactionData, isLoading: isTransactionLoading } =
    useGetTransactionDataQuery()

  const [startDate, setStartDate] = useState<string>(now)
  const [endDate, setEndDate] = useState<string>(now)
  const [transactionTypes, setTransactionTypes] = useState<string[]>([])
  const [transactionStatus, setTransactionStatus] = useState<string[]>([])
  const [selection, setSelection] = useState<string[]>([])
  const [period, setPeriod] = useState<string>("")
  const [selectionStatus, setSelectionStatus] = useState<string[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModall, setOpenModall] = useState<boolean>(false)

  useEffect(() => {
    if (transactionData) {
      const uniqueTypes = [
        ...new Set(transactionData?.map((item) => item?.type)),
      ]
      const uniqueStatus = [
        ...new Set(transactionData?.map((item) => item?.status)),
      ]
      setTransactionTypes(uniqueTypes)
      setTransactionStatus(uniqueStatus)
    }
  }, [transactionData])
  console.log("end", endDate)
  const applyHandler = () => {
    const data = {
      endDate,
      startDate,
      status: selectionStatus,
      type: selection,
      period: period || moment(endDate).diff(moment(startDate), "days"),
    }
    dispatch(filterActions?.addData(data))
    dispatch(uiActions?.closedrawer())
  }
  return (
    <div className="py-5 px-6  h-full">
      <div className="flex mb-6">
        <div className="font-bold text-dark text-2xl">Filter</div>
      </div>
      <div className="overflow-auto">
        <div className="flex">
          {duration?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setPeriod(item?.name)
                const { startDate, endDate } = item?.calculateDateRange()
                setStartDate(startDate)
                setEndDate(endDate)
              }}
              className="rounded-full border border-faintBorder flex items-center justify-center px-[18px] py-[10px] mr-2"
            >
              <p className="text-dark text-sm font-semibold whitespace-nowrap ">
                {item?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-base text-dark font-semibold mb-3">Date Range</h3>
      <div className="w-full flex gap-2 mb-6">
        <DatePicker value={startDate} onChange={setStartDate} />
        <DatePicker value={endDate} onChange={setEndDate} />
      </div>
      <h3 className="text-base text-dark font-semibold mb-3">
        Transaction Type
      </h3>
      <div className="mb-6">
        <div
          className={`flex-1  flex justify-between items-center p-3 rounded-xl ${
            openModal ? "bg-white border border-3 border-dark" : "bg-lightGrey"
          }`}
          onClick={() => setOpenModal(!openModal)}
        >
          <h3 className="text-dark text-sm font-medium">
            {splitArray(selection)}
          </h3>
          <Image
            src={openModal ? up : down}
            width={20}
            height={20}
            alt="dropdown"
          />
        </div>
        {openModal ? (
          <CheckboxList
            items={transactionTypes}
            selection={selection}
            setSelection={setSelection}
          />
        ) : null}
      </div>
      <h3 className="text-base text-dark font-semibold mb-3">
        Transaction Status
      </h3>
      <div>
        <div
          className={`flex-1  flex justify-between items-center p-3 rounded-xl ${
            openModall ? "bg-white border-3 border-dark" : "bg-lightGrey"
          }`}
          onClick={() => setOpenModall(!openModall)}
        >
          <h3 className="text-dark text-sm font-medium">
            {splitArray(selectionStatus)}
          </h3>
          <Image
            src={openModall ? up : down}
            width={20}
            height={20}
            alt="dropdown"
          />
        </div>
        {openModall ? (
          <CheckboxList
            items={transactionStatus}
            selection={selectionStatus}
            setSelection={setSelectionStatus}
          />
        ) : null}
      </div>
      <div className="absolute flex  justify-around items-center bottom-6 right-3 left-3">
        <button
          type="button"
          className="cursor-pointer text-base text-dark bg-white w-[198px] font-semibold border border-faintBorder px-7 py-[5px]  rounded-full hover:bg-faintBorder hover:text-text"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={applyHandler}
          className="cursor-pointer text-base text-white font-semibold  w-[198px] bg-dark px-7 py-[5px] rounded-full hover:bg-text"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default Filter
