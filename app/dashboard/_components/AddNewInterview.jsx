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
  
    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on this information, please provide 5 interview questions with answers in JSON format as [{"question": "question", "answer": "answer"}]. Only provide JSON output without additional text.`;
  
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = await result.response.text();
  
      // Remove backticks, ensure no extraneous characters
      MockJsonResp = MockJsonResp.replace(/```json|```/g, '').trim();
  
      // Wrap JSON objects in an array if needed
      if (!MockJsonResp.startsWith('[')) {
        MockJsonResp = `[${MockJsonResp}]`;
      }
  
      // Ensure valid JSON by handling commas between objects
      MockJsonResp = MockJsonResp.replace(/}\s*{/g, '},{');
  
      // Parse and handle the response
      const parsedResponse = JSON.parse(MockJsonResp);
      setJsonResponse(parsedResponse);
  
      // Insert parsed data into the database
      const resp = await db.insert(Prepwise)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(parsedResponse),
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        })
        .returning({ mockId: Prepwise.mockId });
  
      if (resp) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    } finally {
      setLoading(false);
    }
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
                    <div className='flex justify-end gap-2 mt-2'>
                      <Button type="button" onClick={() => setOpenDialog(false)} variant="outline" >Cancel</Button>
                      <Button type="submit" disabled={loading} className="">
                          {loading?
                              <div className='flex gap-2 items-center'>
                                  <LoaderIcon className='animate-spin'/> Generating Questions
                              </div>
                              :
                              "Start Interview"
                            }      
                      </Button>
                    </div>
                </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview