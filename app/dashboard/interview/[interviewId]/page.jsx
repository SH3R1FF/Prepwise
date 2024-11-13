"use client"

import { db } from "@/utils/drizzle/db";
import { Prepwise } from "@/utils/drizzle/schema";
import { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import React from 'react';
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const interviewId = React.use(params).interviewId;

  useEffect(() => {
    console.log(interviewId);
    GetInterviewDetails();
  }, [interviewId]);
  
  const GetInterviewDetails = async () => {
    const result = await db.select().from(Prepwise)
      .where(eq(Prepwise.mockId, interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl text-neutral-300">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex flex-col my-8 gap-5  ">
            <div className="flex flex-col p-5 rounded-lg border gap-5 bg-neutral-900 text-neutral-200">
                <h2><strong className="text-green-500">Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
                <h2><strong className="text-green-500">Job Description: </strong>{interviewData?.jobDesc}</h2>
                <h2><strong className="text-green-500">Job Experience: </strong>{interviewData?.jobExperience} years+ </h2>
            </div>

            <div className="p-5 border rounded-lg border-yellow-200 bg-yellow-100">
                <div className="flex gap-2 items-center py-2 my-2  rounded-xl w-fit ">    
                    <Lightbulb className="w-6 h-6 text-yellow-500"/>
                    <span className="text-yellow-500 font-semibold">Important Information</span>
                </div>
                <h2 className="text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
        </div>

        <div>
            {webCamEnabled ? (
            <>
              <Webcam
                style={{
                  height: 380,
                  width: 380,      
                }}
                mirrored={true}
                />
                <Button onClick={() => setWebCamEnabled(false)}>
                  Disable Webcam and Microphone
                </Button>
            </>
            
            ) : (
            <>
                <WebcamIcon className="w-full h-[316px] p-20 bg-neutral-900 rounded-lg border my-8 text-neutral-700"/>
                <Button onClick={() => setWebCamEnabled(true)}>
                  Enable Webcam and Microphone
                </Button>
            </>
            )}
        </div>

        </div>

        <Link href={'/dashboard/interview/'+interviewId+'/start'}>
            <Button className="m-2" >Start Interview</Button>
        </Link>
    </div>
  );
}

export default Interview;
