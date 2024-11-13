"use client"

import { db } from '@/utils/drizzle/db'
import { UserAnswer } from '@/utils/drizzle/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [overallRating, setOverallRating] = useState(null);

  const router = useRouter()
  const interviewId = React.use(params).interviewId;

  useEffect(() => {
    GetFeedback();
  }, [interviewId]);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    // Calculate the overall rating after fetching the feedback
    calculateOverallRating(result);
  }

  const calculateOverallRating = (feedbackList) => {
    if (feedbackList.length > 0) {
      const totalRating = feedbackList.reduce((acc, item) => {
        // Ensure item.rating is a number, defaulting to 0 if undefined or null
        const rating = typeof item.rating === 'number' ? item.rating : 0;
        return acc + rating;
      }, 0);
  
      const averageRating = totalRating / feedbackList.length;
      setOverallRating(averageRating.toFixed(1)); // Rounded to one decimal
    } else {
      setOverallRating(null);
    }
  };

  return (
    <div className='lg:p-10 p-5'>
      {feedbackList.length === 0 ? (
        <h2 className='text-xl font-bold text-neutral-600'>No Feedback Available</h2>
      ) : (
        <>
          <h2 className='font-bold text-3xl text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl text-neutral-600'>
            You have successfully completed the interview. This is your Interview Feedback
          </h2>
          <h2 className='text-lg my-3 text-neutral-300'>
            Your Overall Interview Rating: <strong className='text-green-500'>{overallRating || "N/A"}/10</strong>
          </h2>

          <h2 className='text-sm text-neutral-500'>
            Find below interview question with correct answer, Your answer and feedback for improvement
          </h2>

          {feedbackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-2 bg-neutral-900 border-2 text-neutral-300 rounded-lg my-2 text-left flex items-center gap-2 w-full justify-between'>
                {item.question} <ChevronsUpDown className='h-16 w-16 md:h-4 md:w-4 md:m-0 m-4'/>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='bg-yellow-100 text-yellow-900 p-2 border rounded-lg w-fit'><strong>Rating: </strong>{item.rating}</h2>
                  <h2 className='p-2 border rounded-lg bg-red-100 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-green-100 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-indigo-100 text-sm text-indigo-900'><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button className="my-2" onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  )
}

export default Feedback
