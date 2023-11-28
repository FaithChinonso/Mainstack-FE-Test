"use client"

import Header from "./components/header"
import SideNav from "./components/sideNav"

const ParentContainer = ({ children }: any) => {
  return (
    <div className="flex min-h-screen flex-col items-center  justify-between p-4 w-screen">
      <Header />
      <SideNav />
      {children}
    </div>
  )
}

export default ParentContainer
