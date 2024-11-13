"use client"

import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
// import InterviewList from './_components/interviewList'

function Dashboard
() {
  return (
    <>
    <div className='lg:p-10 p-5'>
      <h2 className='font-bold text-2xl text-neutral-200'>Dashboard</h2>
      <h2 className='text-neutral-500'>Create and Start your AI Mockup Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-4'>
        <AddNewInterview/>
      </div>

      {/* Previous Interview List */}

      <InterviewList/>

    </div>
    </>
  )
}

export default Dashboard
