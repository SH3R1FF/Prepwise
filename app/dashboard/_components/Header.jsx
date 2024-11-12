"use client"

import React from 'react'
import Image from 'next/image'
import logo from "../../../public/interview.png"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

  const path = usePathname()

  return (
    <div className='flex py-4 px-8 items-center justify-between bg-secondary shadow-sm'>

        <div className='flex gap-2 items-center bg-indigo-600 rounded-full py-1 px-2 group cursor-pointer'>
          <Image src={logo} alt="logo" className='h-8 w-8 group-hover:scale-110  transition-all duration-300'/>
          <h1 className='font-extrabold text-xl text-white'>Prepwise</h1>
        </div>
        <ul className='md:flex gap-6 hidden '>
            <li className={`hover:text-primary transition-all cursor-pointer  ${path === "/dashboard" && "font-bold text-primary"} `} >Dashboard</li>

            <li className={`hover:text-primary transition-all cursor-pointer ${path === "/dashboard/questions" && "font-bold text-primary"} `}>Questions</li>
            <li className={`hover:text-primary transition-all cursor-pointer ${path === "/dashboard/upgrade" && "font-bold text-primary"} `}>Upgrade</li>
            <li className={`hover:text-primary transition-all cursor-pointer ${path === "/dashboard/how-it-works" && "font-bold text-primary"} `}>How it Works</li>
        </ul>
        
          <UserButton
              // appearance={{
              //   elements: {
              //       userButtonAvatarBox: "size-full"}
              //   }}
            />
  
    </div>
  )
}

export default Header