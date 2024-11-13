"use client"

import { db } from '@/utils/drizzle/db';
import { Prepwise } from '@/utils/drizzle/schema';
import { useUser } from '@clerk/nextjs';

import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

  const { user }  = useUser()
  const [interviewList, setInterviewList] = useState([])

  useEffect(() => {

    user&&GetInterviewList();

  },[user])

  const GetInterviewList = async () => {
    const result = await db.select()
        .from(Prepwise)
        .where(eq(Prepwise.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Prepwise.id))

        console.log(result);
        setInterviewList(result)
        
  }

  return (
    <>
        <div>
            <h2 className='font-semibold text-xl text-neutral-200'>Previous Mock Interviews</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10'>
                {interviewList && interviewList.map((interview, index) => (
                    <InterviewItemCard 
                    key={index}
                    interview={interview}
                    />
                ))}
            </div>
        </div>
    </>
  )
}

export default InterviewList