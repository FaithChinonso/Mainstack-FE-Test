import moment from "moment"

export function getInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName?.charAt(0).toUpperCase()
  const lastInitial = lastName?.charAt(0).toUpperCase()
  return `${firstInitial}${lastInitial}`
}
export function formatNumberWithComma(number: string | number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
export function getStatusColor(status: any) {
  let color
  switch (status?.toLowerCase()) {
    case "successful":
      color = "#0EA163"
    case "pending":
      color = "#A77A07"
    case "failed":
      color = "#FF000F"
    default:
      color = "#56616B"
  }

  return (
    <h5
      className={`capitalize ${
        status?.toLowerCase() === "successful" ? "text-green" : "text-yellow"
      } text-sm font-medium`}
    >
      {status}
    </h5>
  )
}
export const splitArray = (array: any) => {
  const result = array.reduce(
    (acc: string, current: string, index: any, arr: any) => {
      if (index === 0) {
        return current
      } else if (index === arr.length - 1) {
        return `${acc} and ${current}`
      } else {
        return `${acc}, ${current}`
      }
    },
    ""
  )
  return result
}
// Helper functions to calculate date ranges
export const getTodayDateRange = () => {
  const today = moment().format("YYYY-MM-DD")
  return { startDate: today, endDate: today }
}

export const getLastNDaysDateRange = (days: number) => {
  const endDate = moment().format("YYYY-MM-DD")
  const startDate = moment()
    .subtract(days - 1, "days")
    .format("YYYY-MM-DD")
  return { startDate, endDate }
}

export const getThisMonthDateRange = () => {
  const startDate = moment().startOf("month").format("YYYY-MM-DD")
  const endDate = moment().endOf("month").format("YYYY-MM-DD")
  return { startDate, endDate }
}

export const getLastNMonthsDateRange = (months: number) => {
  const endDate = moment().format("YYYY-MM-DD")
  const startDate = moment()
    .subtract(months - 1, "months")
    .startOf("month")
    .format("YYYY-MM-DD")
  return { startDate, endDate }
}

export const getThisYearDateRange = () => {
  const startDate = moment().startOf("year").format("YYYY-MM-DD")
  const endDate = moment().endOf("year").format("YYYY-MM-DD")
  return { startDate, endDate }
}

export const getLastYearDateRange = () => {
  const endDate = moment().format("YYYY-MM-DD")
  const startDate = moment()
    .subtract(1, "year")
    .startOf("year")
    .format("YYYY-MM-DD")
  return { startDate, endDate }
}

export const getAllTimeDateRange = () => {
  // Define your logic for "All time" date range
  // For example, you can set a fixed start date based on your data
  const startDate = moment().format("YYYY-MM-DD")
  const endDate = moment().format("YYYY-MM-DD")
  return { startDate, endDate }
}
