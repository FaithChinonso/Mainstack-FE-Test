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
  console.log("first")
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
