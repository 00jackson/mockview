"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAI";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [yearsExperience, setYearsExperience] = useState("");
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition, jobDescription, yearsExperience);
        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of experience: ${yearsExperience}. Depending on the details above give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUES_COUNT} interview questions with answers in json format. Give question and answer as fields in JSON.`;
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '');
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if (MockJsonResp) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: MockJsonResp,
                JobPosition: jobPosition,
                JobDescription: jobDescription,
                yearsExperience: yearsExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('YYYY-MM-DD'),
            }).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID:", resp);
            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId);
            }
        } else {
            console.error("Failed to insert mock interview");
        }
        setLoading(false);
    };

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-bold text-lg text-center">+ Add New</h2>
            </div>

            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add details about your Job position/role, Job description, and years of experience</h2>
                                    <div className="mt-7 my-3">
                                        <label>Job Position/Role</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            required
                                            onChange={(event) => setJobPosition(event.target.value)}
                                        />
                                    </div>

                                    <div className="my-3">
                                        <label>Job Description/Tech Stack</label>
                                        <Textarea
                                            placeholder="Ex. JavaScript, React, NextJs, Angular etc."
                                            required
                                            onChange={(event) => setJobDescription(event.target.value)}
                                        />
                                    </div>

                                    <div className="my-3">
                                        <label>Years of experience</label>
                                        <Input
                                            placeholder="Ex. 2"
                                            type="number"
                                            max="50"
                                            required
                                            onChange={(event) => setYearsExperience(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" />
                                                Generating from AI
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;