import fourth from "../../assets/images/Product Icons (1).svg"
import first from "../../assets/images/Product Icons (2).svg"
import third from "../../assets/images/Product Icons.svg"
import analyticsActive from "../../assets/images/Vector-active.svg"
import analytics from "../../assets/images/Vector.svg"
import second from "../../assets/images/app-bar-list.svg"
import crmActive from "../../assets/images/group-active.svg"
import crm from "../../assets/images/group.svg"
import homeActive from "../../assets/images/home-active.svg"
import home from "../../assets/images/home.svg"
import revenue from "../../assets/images/payment.svg"
import revenueActive from "../../assets/images/payments-active.svg"
import appsActive from "../../assets/images/widgets-active.svg"
import apps from "../../assets/images/widgets.svg"
import {
  getAllTimeDateRange,
  getLastNDaysDateRange,
  getLastNMonthsDateRange,
  getLastYearDateRange,
  getThisMonthDateRange,
  getThisYearDateRange,
  getTodayDateRange,
} from "./helpers"
import { NavListItem } from "./types"

export const navList: NavListItem[] = [
  {
    id: "1",
    name: "Home",
    icon: home,
    activeIcon: homeActive,
    route: "",
  },
  {
    id: "2",
    name: "Analytics",
    icon: analytics,
    activeIcon: analyticsActive,
    route: "",
  },
  {
    id: "3",
    name: "Revenue",
    icon: revenue,
    activeIcon: revenueActive,
    route: "",
  },
  {
    id: "4",
    name: "CRM",
    icon: crm,
    activeIcon: crmActive,
    route: "",
  },
  {
    id: "5",
    name: "Apps",
    icon: apps,
    activeIcon: appsActive,
    route: "",
  },
]
export const sideNav: any[] = [
  {
    id: "1",
    name: "Home",
    icon: first,
    activeIcon: homeActive,
    route: "",
  },
  {
    id: "2",
    name: "Analytics",
    icon: second,
    activeIcon: analyticsActive,
    route: "",
  },
  {
    id: "3",
    name: "Revenue",
    icon: third,
    activeIcon: revenueActive,
    route: "",
  },
  {
    id: "4",
    name: "CRM",
    icon: fourth,
    activeIcon: crmActive,
    route: "",
  },
]
export const data = [
  { name: "Apr 2,  2022", uv: 1, pv: 4, amt: 0 },
  { name: "Apr 30 ,  2022", uv: 4, pv: 1, amt: 0 },
  { name: "Apr 2,  2022", uv: 1, pv: 4, amt: 0 },
  { name: "Apr 30 ,  2022", uv: 4, pv: 1, amt: 0 },
]
export const stats = [
  { id: 1, figure: "USD 5,000.00", name: "Ledger Balance" },
  { id: 2, figure: "USD 5,000.00", name: "Total Payout" },
  { id: 3, figure: "USD 5,000.00", name: "Total Revenue" },
  { id: 4, figure: "USD 5,000.00", name: "Pending Payout" },
]
export const duration = [
  { id: 1, name: "Today", calculateDateRange: () => getTodayDateRange() },
  {
    id: 2,
    name: "Last 7 days",
    calculateDateRange: () => getLastNDaysDateRange(7),
  },
  {
    id: 3,
    name: "This month",
    calculateDateRange: () => getThisMonthDateRange(),
  },
  {
    id: 4,
    name: "Last 3 months",
    calculateDateRange: () => getLastNMonthsDateRange(3),
  },
  {
    id: 5,
    name: "This year",
    calculateDateRange: () => getThisYearDateRange(),
  },
  {
    id: 6,
    name: "Last year",
    calculateDateRange: () => getLastYearDateRange(),
  },
  { id: 7, name: "All time", calculateDateRange: () => getAllTimeDateRange() },
]
