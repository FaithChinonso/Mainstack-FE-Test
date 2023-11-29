import Image from "next/image"
import Empty from "../assets/images/empty.svg"
import { filterActions } from "../redux/features/filter-slice"
import { useAppDispatch } from "../redux/redux-hooks"

const EmptyTable = () => {
  const dispatch = useAppDispatch()

  return (
    <section className="flex  justify-center items-center ">
      <div className="flex flex-col justify-center md:items-start items-center w-full  md:w-[369px] ">
        <div className="bg-faintBorder rounded-full w-8 h-8 mb-[20px] flex  justify-center items-center">
          <Image src={Empty} width={24} height={24} alt="empty table" />
        </div>
        <h2 className="text-dark text-[28px] font-bold mb-[10px]">
          No matching transaction found for the selected filter
        </h2>
        <p className="text-text font-medium text-base mb-8">
          Change your filters to see more results, or add a new product.
        </p>
        <button
          onClick={() => {
            const data = {
              endDate: null,
              startDate: null,
              status: null,
              type: null,
              period: null,
            }
            dispatch(filterActions?.addData(data))
          }}
          className="cursor-pointer w-[127px] md:text-base text-sm  text-dark bg-white  font-semibold  bg-faintBorder px-6 py-3  rounded-full hover:bg-faintBorder hover:text-text"
          type="button"
        >
          Clear Filter
        </button>
      </div>
    </section>
  )
}

export default EmptyTable
