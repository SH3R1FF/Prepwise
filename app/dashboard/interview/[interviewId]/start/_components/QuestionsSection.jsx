import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        
    } else {
        alert("Speech synthesis not supported by this browser.");
    }
  }

  return mockInterviewQuestion && (
    <div className='p-5 border-2 rounded-lg my-10 bg-neutral-900'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
            {mockInterviewQuestion && mockInterviewQuestion.map((question,index) => (
                <h2 className={` p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer bg-neutral-950 text-neutral-300 ${activeQuestionIndex === index && "bg-primary text-primary-foreground"} `} key={index}>Question #{index+1}</h2>
            ))}

        </div>
        <h2 className='my-5 text-base md:text-lg text-neutral-300'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2  className='cursor-pointer text-white' onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-indigo-600'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-indigo-600 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>

    </div>
  )
}

export default QuestionsSection