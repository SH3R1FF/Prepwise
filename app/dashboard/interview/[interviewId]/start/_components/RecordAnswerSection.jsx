"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from "@/public/interview.png"
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { db } from '@/utils/drizzle/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserAnswer } from '@/utils/drizzle/schema'

function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {

  const [userAnswer, setUserAnswer] = useState('');
  const {user} = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => setUserAnswer(prevAnswer => prevAnswer + result?.transcript));
  },[results])

  useEffect(() => {
    if (!isRecording&&userAnswer.length>10) {
      UpdateUserAnswer();
    }

    // if(userAnswer?.length < 10) {
    //   setLoading(false);
    //   toast('Error while saving your answer, Please record again')
    //   return ;
    // }
  }, [userAnswer])

  const StartStopRecording = async () => {
    if (isRecording) {

      stopSpeechToText();

    } else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {

    console.log(userAnswer);
    
    setLoading(true);
    const feedbackPrompt = "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question + ", User Answer:"+userAnswer+", Depends on question and user answer for given interview question " + " Please give rating for answer and feeback as area of improvement if any " + " in just 3 to 5 lines to improve it in JSON format with rating and field and feeback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '').trim();
      console.log(mockJsonResp);

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      })
      
      if (resp) {
        toast('Answer Recorded Successfully')
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
      setLoading(false);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={logo} alt="logo" className='h-[200px] w-[200px] absolute animate-pulse'/>
        <Webcam 
          mirrored={true}
          style={{
            height: 300,
            width: "100",
            zIndex: 10
          }} 
          />
      </div>
      <Button 
        variant="outline" 
        className={`my-10 `}
        onClick={StartStopRecording}
        disabled={loading}
      >
       {isRecording ?
        <h2 className='text-red-600 flex gap-2 items-center'>
          <StopCircle/> Stop Recording... 
        </h2> : 

        <div className='flex gap-2 items-center text-indigo-500'>
          <Mic/>
          Record Answer
        </div>
        }
  
        </Button>

    
       
    </div>
  )
}

export default RecordAnswerSection