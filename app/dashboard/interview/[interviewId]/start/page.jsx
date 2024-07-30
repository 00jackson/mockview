"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [mockInterviewQues, setMockInterviewQues] = useState([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchInterviewDetails = async () => {
            try {
                const result = await db
                    .select()
                    .from(MockInterview)
                    .where(eq(MockInterview.mockId, params.interviewId));

                if (result.length > 0) {
                    const jsonMockResp = JSON.parse(result[0].jsonMockResp);

                    if (Array.isArray(jsonMockResp)) {
                        setMockInterviewQues(jsonMockResp);
                    } else {
                        console.error("Parsed response is not an array:", jsonMockResp);
                    }

                    setInterviewData(result[0]);
                } else {
                    console.warn("No interview data found for the given ID.");
                }
            } catch (error) {
                console.error("Error fetching interview details:", error);
            }
        };

        fetchInterviewDetails();
    }, [params.interviewId]);

    useEffect(() => {
        let hideAlertTimeout;
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setShowAlert(true);
                clearTimeout(hideAlertTimeout);
            } else {
                hideAlertTimeout = setTimeout(() => setShowAlert(false), 2000);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            clearTimeout(hideAlertTimeout);
        };
    }, []);

    if (!interviewData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <LoaderCircle className="animate-spin h-10 w-10 text-primary" />
                <p className="mt-4 text-xl font-semibold text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <>
            {showAlert && (
                <Alert variant="destructive" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full p-2 text-sm">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle className="text-sm ml-2">Caution</AlertTitle>
                    <AlertDescription className="text-sm ml-2 -mt-2">
                        Avoid switching between different tabs.
                    </AlertDescription>
                </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <QuestionSection
                        mockInterviewQues={mockInterviewQues}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                        setActiveQuestionIndex={setActiveQuestionIndex}
                    />
                </div>
                <div>
                    <RecordAnswerSection
                        mockInterviewQues={mockInterviewQues}
                        activeQuestionIndex={activeQuestionIndex}
                    />
                </div>
            </div>
            <div className='flex justify-end gap-4 mr-7'>
                {activeQuestionIndex > 0 && <Button
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQues?.length - 1 && <Button
                    onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                {activeQuestionIndex == mockInterviewQues?.length - 1 &&
                    <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}><Button variant='destructive'>End Interview</Button></Link>}
            </div>
        </>
    );
}

export default StartInterview;