import moment from "moment"
import Image from "next/image"
import React from "react"
import down from "../assets/images/expand_more (1).svg"

const DatePicker = ({
  value,
  onChange,
}: {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}) => (
  <div className="flex-1 bg-lightGrey flex justify-between items-center p-3 rounded-xl">
    <h3 className="text-dark text-sm font-medium">{value}</h3>
    <div className="w-5 h-5 relative">
      <Image
        src={down}
        width={20}
        height={20}
        alt="dropdown"
        className="absolute top-0"
      />
      <input
        type="date"
        className="opacity-0 z-20 bg-green w-full h-5"
        onChange={(e) => onChange(e.target.value)}
        max={moment().format("YYYY-MM-DD")}
      />
    </div>
  </div>
)

export default DatePicker
