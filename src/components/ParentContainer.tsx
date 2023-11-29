"use client"

import { Provider } from "react-redux"
import { store } from "../redux/store"
import DrawerCard from "./DrawerCard"
import Header from "./Header"
import SideNav from "./SideNav"

const ParentContainer = ({ children }: any) => {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center  justify-between p-4 w-screen bg-white">
        <Header />
        <SideNav />
        <DrawerCard />
        <div>{children}</div>
      </main>
    </Provider>
  )
}

export default ParentContainer
