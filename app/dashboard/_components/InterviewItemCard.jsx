"use client"

import { Button } from '@/components/ui/button'
import { Clock7 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {

  const router = useRouter();

  return (
    <div className='border shadow-sm rounded-lg p-5 bg-neutral-900'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-neutral-500'>{interview.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-neutral-300 mt-3 flex items-center gap-2'> <Clock7 className='h-4 w-4' /> Created At: {interview.createdAt}</h2>
        <div className='flex justify-between mt-4 gap-5'> 
            
            <Button 
                size="sm" 
                variant="outline" 
                className="w-full" 
                onClick={() => router.push(`/dashboard/interview/${interview.mockId}/feedback`)}    
            >Feedback</Button>
        
            <Button 
                size="sm" 
                className="w-full" 
                onClick={() => router.push(`/dashboard/interview/${interview.mockId}/start`)}
            >Start</Button>
        </div>

    </div>
  )
}

export default InterviewItemCard