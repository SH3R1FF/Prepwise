"use client"

import { db } from '@/utils/drizzle/db'
import { Prepwise } from '@/utils/drizzle/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({params}) {


  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const interviewId = React.use(params).interviewId

  useEffect(() => {

    GetInterviewDetails();

  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(Prepwise).where(eq(Prepwise.mockId,interviewId))

    const jsonMockResp = JSON.parse(result[0].jsonMockResp)

    console.log(jsonMockResp);
    
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);

  }

  return (
  <>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
        {/* Video */}
        <RecordAnswerSection 
           mockInterviewQuestion={mockInterviewQuestion}
           activeQuestionIndex={activeQuestionIndex}
           interviewData={interviewData}
           />
    </div>

        <div className='flex justify-end gap-6 m-2'>
          {activeQuestionIndex> 0 &&
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button> }

          { activeQuestionIndex != mockInterviewQuestion?.length - 1 &&
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>
          }

          {activeQuestionIndex === mockInterviewQuestion?.length - 1 && 

          <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
            <Button >End Interview</Button>
          </Link>
          }
        </div>
  </>
  )
}

export default StartInterview