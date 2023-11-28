"use client"

import { useGetUserDataQuery } from "@/services/queryApi"
import Image from "next/image"
import Link from "next/link"

import { useState } from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import Bell from "../../assets/images/icon.svg"
import Logo from "../../assets/images/mainstack-logo.svg"
import Menu from "../../assets/images/menu.svg"
import Comment from "../../assets/images/small tertiary button.svg"
import { getInitials } from "../helpers"
import { NavListItem } from "../types"
import { navList } from "../utils"

const Header = () => {
  const [active, setActive] = useState<string>("")
  const { data, isLoading } = useGetUserDataQuery()
  console.log("first", data, isLoading)
  return (
    <div className="fixed flex justify-between items-center shadow-light-mode-100 w-[calc([screen-32px])] border-2 border-faintBorder  border-t-0 rounded-[100px] px-6 py-4 left-4 right-4">
      {isLoading ? (
        <SkeletonTheme baseColor="#fff" highlightColor="#d7d7d7">
          <p>
            <Skeleton count={1} width={1900} height={50} />
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
                  {getInitials(data?.first_name, data?.last_name) || (
                    <Skeleton count={2} />
                  )}
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
  )
}

export default Header
