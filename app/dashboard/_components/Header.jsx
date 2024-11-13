"use client"

import React from 'react'
import Image from 'next/image'
import logo from "../../../public/interview.png"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Header() {

  const path = usePathname()

  return (
    <div className='flex py-2 lg:px-8 px-4 items-center justify-between bg-neutral-900 shadow-sm border-b-2  '>

        <div className='flex gap-2 items-center bg-green-500  rounded-l-3xl rounded-r-lg  py-1 px-2 cursor-pointer'>
          <Image src={logo} alt="logo" className='h-7 w-7 '/>
          <h1 className='font-extrabold text-xl text-white'>Prepwise</h1>
        </div>
        <ul className='md:flex gap-6 hidden text-neutral-300 border-2 p-3 rounded-full text-sm'>
            <li className={`hover:text-primary transition-all cursor-pointer  ${path === "/" && "font-bold text-primary"} `} >
              <Link href="/">
                Home
              </Link>
            </li>

            <li className={`hover:text-primary transition-all cursor-pointer ${path === "/dashboard" && "font-bold text-primary"} `}>
              <Link href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className={`hover:text-primary transition-all cursor-pointer ${path === "/dashboard/upgrade" && "font-bold text-primary"} `}>Upgrade</li>
            <li className={`hover:text-primary transition-all cursor-pointer ${path === "/dashboard/how-it-works" && "font-bold text-primary"} `}>How it Works</li>
        </ul>
         
            <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: ""}
                  }}
                />
  
    </div>
  )
}

export default Header