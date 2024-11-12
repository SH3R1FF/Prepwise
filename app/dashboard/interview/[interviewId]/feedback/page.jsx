"use client"

import { db } from '@/utils/drizzle/db'
import { UserAnswer } from '@/utils/drizzle/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { useState } from 'react'  
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Feedback({params}) {

  const [feedbackList , setFeedbackList] = useState([]);

  const router = useRouter()

  const interviewId = React.use(params).interviewId;

  useEffect(() => {
    GetFeedback();
  })

  const GetFeedback = async () => {
    const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

        console.log(result);
        
        setFeedbackList(result);
  }

  return (
    <div className='p-10'>
      {feedbackList.length === 0 ? <h2 className='text-xl font-bold text-gray-500'>No Feedback Available</h2> : <>
      
        <h2 className='font-bold text-3xl text-green-500'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>You have successfully completed the interview. This is your Interview Feedback</h2>
        <h2 className='text-primary text-lg my-3'>Your Overall Interview Rating: <strong>7/10</strong></h2>


        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>

        {feedbackList && feedbackList.map((item, index) =>(
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex items-center gap-2 w-full justify-between '>
                {item.question} <ChevronsUpDown className='h-16 w-16 md:h-4 md:w-4 md:m-0 m-4 '/>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className='flex flex-col gap-2'>
                <h2 className='bg-yellow-50 text-yellow-900 p-2 border rounded-lg w-fit'><strong>Rating: </strong>{item.rating}</h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg bg-indigo-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
            </div>
              {/* {item} */}
            </CollapsibleContent>
          </Collapsible>
          
          
        ))}
        
        </>}

            <Button className="my-2"   onClick= {() => router.replace("/dashboard")} >Go Home</Button>
        
    </div>
  )
}

export default Feedback