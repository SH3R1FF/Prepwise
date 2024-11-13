// import { ModeToggle } from "@/components/toggle-mode";
import { ArrowRightIcon, ChevronRight, Handshake, LayoutDashboard, Sun } from "lucide-react";
import {Button} from "../components/ui/button";
import Image from "next/image";
import logo from "@/public/interview.png"
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import HeroLottie from "@/components/Hero-Lottie";

export default function Home() {

  return (
    <div className="bg-neutral-950 h-full">
      {/* Pre_Header */}
      <div className="border-b-2 border-neutral-800 flex justify-center items-center py-3 transition ease-out hover:duration-500 group cursor-pointer lg:text-sm text-xs  font-semibold text-neutral-500 hover:text-neutral-200 duration-500 max-sm:p-2 ">
        <span className="line-clamp-1 ">Enhance Your Interview Skills with Real-Time AI Insights</span>
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </div>

      {/* Header */}
      
      <div className="flex py-3 lg:px-8 px-4 items-center justify-between shadow-sm border-b-2 border-neutral-800 bg-neutral-900 ">
        <div className='flex gap-2 items-center cursor-pointer bg-green-500  rounded-l-3xl rounded-r-lg py-1 px-2'>
          <Image src={logo} alt="logo" className='h-7 w-7   transition-all duration-300'/>
          <h1 className='font-extrabold text-xl text-white'>Prepwise</h1>
        </div>

        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </div>
      </div>

      {/* Hero Section */}

      <div className="grid grid-cols-1 md:grid-cols-2 text-white p-10 lg:mt-28 ">
        <div className="flex flex-col items-center gap-2  w-full">
          <h1 className="text-7xl font-bold">Prepwise</h1>
          <span className="text-base text-neutral-500 lg:p-8 p-4 lg:mx-12 text-justify">The AI Mock Interview app helps you prepare for job interviews by simulating real scenarios, providing personalized feedback and model answers. Practice answering questions, review your performance, and build confidence for your next interview.</span>
          <div className="flex gap-4 font-bold">
            <Link href={"/sign-up"}>
              <Button className="bg-primary font-semibold rounded-full" > <Handshake /> Join Now <ChevronRight/> </Button>
            </Link>

            <Link href="/dashboard">
              <Button className="bg-transparent hover:bg-green-600 font-semibold rounded-full" ><LayoutDashboard/> Go to Dashboard <ChevronRight/></Button>
            </Link>
          </div>
          
        </div>
        <div className="flex justify-center  w-full">
          
          <HeroLottie/>
        </div>
      </div>

      {/* <ModeToggle/> */}
    </div>
  );
}
