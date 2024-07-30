"use client";

import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { ChevronDown, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = async () => {
        setLoading(true);
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);

        console.log(result);
        setFeedbackList(result);
        setLoading(false);
    };

    const calculateOverallRating = () => {
        if (feedbackList.length === 0) return 0;
        const totalRating = feedbackList.reduce((acc, item) => acc + parseInt(item.rating), 0);
        return (totalRating / feedbackList.length) * 2; 
    };

    const overallRating = calculateOverallRating();

    return (
        <div className="p-10 flex flex-col min-h-screen">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <LoaderCircle className="animate-spin h-10 w-10 text-primary" />
                    <p className="mt-4 text-xl font-semibold text-gray-500">Loading...</p>
                </div>
            ) : (
                <>
                    {feedbackList.length === 0 ? (
                        <>
                            <div className="flex justify-start">
                                <h2 className="text-3xl font-semibold text-red-300">No interview records found</h2>
                            </div>
                            <div className="flex justify-start mt-4">
                                <Button onClick={() => router.replace('/dashboard')} className='my-4'>
                                    Return to Dashboard
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
                            <h2 className="font-bold text-2xl">Here is your mock interview feedback ⬇️</h2>
                            <h2 className="text-primary text-lg my-3">Your overall mock interview rating is: <strong>{overallRating.toFixed(1)}/10</strong></h2>
                            <h2 className="text-sm text-gray-500">Find your interview questions with your answers, correct answers and get feedback for improvement.</h2>
                            {feedbackList.map((item, index) => (
                                <Collapsible key={index} className="mt-5">
                                    <CollapsibleTrigger className="p-2 bg-secondary rounded-md my-2 text-left flex justify-between gap-7 w-full">
                                        {index + 1}. {item.question}
                                        <ChevronDown className="h-5 w-5" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-red-500 p-2 border rounded-lg"><strong>Rating: </strong>{item.rating}</h2>
                                            <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your answer: </strong>{item.userAns}</h2>
                                            <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct answer: </strong>{item.correctAnswer}</h2>
                                            <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary"><strong>Feedback: </strong>{item.feedback}</h2>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                            <div className="flex justify-start mt-4">
                                <Button onClick={() => router.replace('/dashboard')} className='my-4'>
                                    Return to Dashboard
                                </Button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Feedback;