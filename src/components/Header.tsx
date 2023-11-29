"use client"

import Image from "next/image"
import Link from "next/link"

import { useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { navList } from "../app/utils/data"
import { getInitials } from "../app/utils/helpers"
import { NavListItem } from "../app/utils/types"
import Bell from "../assets/images/icon.svg"
import Logo from "../assets/images/mainstack-logo.svg"
import Menu from "../assets/images/menu.svg"
import Comment from "../assets/images/small tertiary button.svg"
import { useGetUserDataQuery } from "../redux/services/queryApi"

const Header = () => {
  const [active, setActive] = useState<string>("")
  const { data, isLoading } = useGetUserDataQuery()
  // const [windowSize, setWindowSize] = useState<number[]>([
  //   window?.innerWidth,
  //   window?.innerHeight,
  // ])

  //
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const handleWindowResize = () => {
  //       const width = window.innerWidth
  //       const height = window.innerHeight
  //       setWindowSize([width, height])
  //     }
  //     window.addEventListener("resize", handleWindowResize)

  //     return () => {
  //       window.removeEventListener("resize", handleWindowResize)
  //     }
  //   }
  // }, [])
  return (
    <header className=" font-custom fixed flex justify-center items-center shadow-light-mode-100 w-[calc([screen-16px])] md:w-[calc([screen-32px])] border-2 border-faintBorder  border-t-0 rounded-[100px] top-0 left-2 right-2 md:left- md:right-4 z-10 bg-white">
      <div className="2xl:max-w-[1440px] flex justify-between items-center  px-6 py-4 w-full">
        {isLoading ? (
          <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
            <p className="w-full max-w-full overflow-hidden">
              <Skeleton count={1} width={1256} height={50} />
            </p>
          </SkeletonTheme>
        ) : (
          <>
            <a href="" className="" target="_blank" rel="noopener noreferrer">
              <Image
                className=""
                src={Logo}
                alt="Mainstack Logo"
                width={36}
                height={36}
                priority
              />
            </a>
            <ul className=" hidden md:flex">
              {navList?.map((item: NavListItem) => (
                <li
                  key={item.id}
                  className={`flex items-center gap-1 px-[14px] py-2 rounded-[100px]  ${
                    active === item?.name
                      ? "bg-dark text-white"
                      : "bg-transparent text-[#56616B]"
                  }`}
                  onClick={() => setActive(item?.name)}
                >
                  <Image
                    className=""
                    src={active === item?.name ? item?.activeIcon : item?.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                  />
                  <Link href={`/${item.route}`}>{item?.name}</Link>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <Image
                className=""
                src={Bell}
                alt="Bell"
                width={30}
                height={30}
                priority
              />
              <Image
                className=""
                src={Comment}
                alt="Mainstack Logo"
                width={30}
                height={30}
                priority
              />
              <div className="flex gap-2 bg-[#EFF1F6] rounded-full px-2 py-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-b from-gray-600 to-black flex items-center justify-center">
                  <h4 className="text-white text-sm font-semibold">
                    {data?.first_name
                      ? getInitials(data?.first_name, data?.last_name)
                      : "MN"}
                  </h4>
                </div>
                <Image
                  className=""
                  src={Menu}
                  alt="Menu"
                  width={20}
                  height={20}
                  priority
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
