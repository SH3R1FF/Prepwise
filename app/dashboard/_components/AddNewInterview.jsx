"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
  } from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import {Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { FilePlus2, LoaderIcon } from 'lucide-react'
import { db } from '@/utils/drizzle/db'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import { Prepwise } from '@/utils/drizzle/schema'
import { useRouter } from 'next/navigation'

function AddNewInterview() {

  const [openDialog, setOpenDialog] = useState(false)

  const [jobPosition, setJobPosition] = useState()
  const [jobDesc, setJobDesc] = useState()
  const [jobExperience, setJobExperience] = useState()

  const [loading, setLoading] = useState(false)
  const [jsonResponse,setJsonResponse] = useState([])

  const { user } = useUser()
  const router = useRouter()

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
  
    const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + ". Depends on this information please give me 5 interview questions with answers in json format, give question and answers as field in JSON. Give the output in this format: ```json {\"question\": \"question\", \"answer\": \"answer\"}```. Do not give any other text in the response. Do not write anything extra.";
  
    const result = await chatSession.sendMessage(InputPrompt);
    let MockJsonResp = result.response.text();
  
    // Print the raw response for debugging purposes
    console.log("Raw Response:", MockJsonResp);
  
    // Remove backticks and any other non-JSON characters that may be in the response
    MockJsonResp = MockJsonResp.replace('```json', '').replace('```', '').trim();
  
    // Ensure no extraneous characters after JSON data
    MockJsonResp = MockJsonResp.replace(/\s*[^}]*$/, '');  // Removing everything after the last closing brace
  
    // Wrap the multiple objects in an array to make it valid JSON
    MockJsonResp = `[${MockJsonResp.replace(/\n/g, ',')}]`;  // Replace newlines with commas between objects
  
    // Print the sanitized response for debugging
    console.log("Sanitized Response:", MockJsonResp);
  
    // Now try parsing the sanitized response
    try {
      const parsedResponse = JSON.parse(MockJsonResp);
      console.log("Parsed JSON:", parsedResponse);
      setJsonResponse(parsedResponse);
  
      // Insert into the database
      const resp = await db.insert(Prepwise)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        })
        .returning({ mockId: Prepwise.mockId });
  
      console.log("Inserted ID:", resp);
      if (resp) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      }

    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  
    setLoading(false);
  };
  

  return (
    <div>
        <div className='p-10 border rounded-lg bg-neutral-900 text-neutral-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all duration-400 flex items-center gap-2 justify-center' onClick={() => setOpenDialog(true)}>
            <Button className='text-lg text-center '> <FilePlus2 /> Add New</Button>
        </div>
        <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl bg-neutral-950">
            <DialogHeader>
            <DialogTitle className="text-neutral-300">Tell us more about your job interviewing</DialogTitle>
            <DialogDescription>
    
                    Add Details about your job position/role, Job description and years of experience
                
            </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit}>
                <div className='my-2'>
                    <Label className="text-neutral-400" >Job Role / Job Position</Label>
                    <Input 
                      placeholder="Ex. Full Stack Developer" 
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                      className="bg-neutral-900 outline-none border-neutral-800 text-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                </div>
                <div className='my-2'>
                    <Label className="text-neutral-400">Job Description / Tech Stack</Label>
                    <Textarea placeholder="Ex. React, Node, MongoDB, Express etc" required onChange={(e) => setJobDesc(e.target.value)} className="bg-neutral-900 outline-none border-neutral-800 text-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                </div>
                <div className='my-2'>
                    <Label className="text-neutral-400">Years of experience</Label>
                    <Input placeholder="Ex. 5" type="number" max="80" required onChange={(e) => setJobExperience(e.target.value)} className="bg-neutral-900 outline-none border-neutral-800 text-neutral-200 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={() => setOpenDialog(false)} variant="outline">Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading?
                            <div className='flex gap-2 items-center'>
                                <LoaderIcon className='animate-spin'/> Generating Questions
                            </div>
                            :
                            "Start Interview"
                        }      
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview