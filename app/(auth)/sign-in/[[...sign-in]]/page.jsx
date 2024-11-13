import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

import logo from "@/public/interview.png"
export default function Page() {
  return( 
  
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-950 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="bg"
            src="https://plus.unsplash.com/premium_photo-1675362696692-636305144028?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  
            className="absolute inset-0 h-full w-full object-cover opacity-80 rounded-r-xl"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="/">
              <span className="sr-only">Home</span>
              <Image src={logo} alt='logo' className='h-8 sm:h-10 w-10'/>
            </a>

            <h2 className="mt-6 text-2xl font-bold text-neutral-950 sm:text-3xl md:text-4xl">
              Welcome to Prepwise
            </h2>

            <p className="mt-4 leading-relaxed text-white/80">
            The AI Mock Interview app helps you prepare for job interviews by simulating real scenarios, providing personalized feedback and model answers. Practice answering questions, review your performance, and build confidence for your next interview.
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-neutral-950"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <Image
                  src={logo}
                  className="h-full"
                  alt='logo'
                />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-neutral-300 sm:text-3xl md:text-4xl">
                Welcome to Prepwise 
              </h1>

              <p className="mt-4 leading-relaxed text-neutral-500 my-4">
              The AI Mock Interview app helps you prepare for job interviews by simulating real scenarios, providing personalized feedback and model answers. Practice answering questions, review your performance, and build confidence for your next interview.
              </p>
            </div>

            <SignIn />
          </div>
        </main>
      </div>
    </section>
  
  )
}