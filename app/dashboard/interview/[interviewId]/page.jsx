"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, LoaderCircle, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";


function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails(); // Fetch data from the database and update the state.
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            // Check if result is not empty and set the interviewData
            if (result.length > 0) {
                setInterviewData(result[0]);
            } else {
                console.warn("No interview data found for the given ID.");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };

    return (
        <div className="my-10 px-5">
            <h2 className="font-bold text-2xl text-center mb-8">Let's Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-items-center">
                {/* Job Details Section */}
                <div className="flex flex-col w-full max-w-lg gap-5">
                    {interviewData ? (
                        <>
                            <div className="flex flex-col p-5 rounded-lg border gap-4 bg-white shadow-md">
                                <h2 className="text-lg">
                                    <strong>Job Role/Position:</strong> {interviewData.JobPosition}
                                </h2>
                                <h2 className="text-lg">
                                    <strong>Job Description:</strong> {interviewData.JobDescription}
                                </h2>
                                <h2 className="text-lg">
                                    <strong>Years of Experience:</strong> {interviewData.yearsExperience}
                                </h2>
                            </div>
                            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-50 shadow-md">
                                <h2 className="flex gap-2 items-center text-yellow-600">
                                    <Lightbulb />
                                    <strong>Information</strong>
                                </h2>
                                <p className="mt-3 text-gray-600">
                                    {process.env.NEXT_PUBLIC_INFORMATION}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-full ">
                            <LoaderCircle className="animate-spin w-24 h-24 text-blue-400" />

                        </div>

                    )}
                </div>

                {/* Webcam and Camera Button Section */}
                <div className="flex flex-col items-center justify-center w-full max-w-lg p-7 rounded-lg border bg-white shadow-md">
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                width: "100%",
                                height: "auto",
                                aspectRatio: "4/3",
                            }}
                            className="rounded-md shadow-md border"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <WebcamIcon className="h-64 w-64 text-gray-500 my-4" />
                            <Button
                                className="w-full max-w-xs mt-4"
                                onClick={() => setWebCamEnabled(true)}
                            >
                                Enable Camera
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Start Interview Button */}
            <div className="flex justify-center items-center mt-10">

                <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
                    <Button className="px-8 py-3 text-white">
                        Start Interview
                    </Button>
                </Link>

            </div>
        </div>
    );
}

export default Interview;
