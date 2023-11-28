"use client"

import Image from "next/image"
import { sideNav } from "../utils"

const SideNav = () => {
  return (
    <div className="fixed shadow-light-mode-101 p-2 gap-2 items-center  rounded-full h-[192px] left-4 top-[300px] z-10 bg-white">
      {sideNav?.map((item, index) => (
        <Image
          src={item?.icon}
          alt={item?.name}
          width={40}
          height={40}
          key={item?.id}
        />
      ))}
    </div>
  )
}

export default SideNav
