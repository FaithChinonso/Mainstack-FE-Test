"use client"

import { store } from "@/redux/store"
import { Provider } from "react-redux"
import DrawerCard from "./DrawerCard"
import Header from "./Header"
import SideNav from "./SideNav"

const ParentContainer = ({ children }: any) => {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center  justify-between p-4 w-screen">
        <Header />
        <SideNav />
        <DrawerCard />
        <div>{children}</div>
      </main>
    </Provider>
  )
}

export default ParentContainer
