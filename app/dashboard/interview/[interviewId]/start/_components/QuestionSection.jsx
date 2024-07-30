"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAI";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { eq, and } from "drizzle-orm";
import { useState } from "react";

function QuestionSection({ mockInterviewQues, activeQuestionIndex, setActiveQuestionIndex, interviewData }) {
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useUser();

    const handleAnswerChange = (e) => {
        const newAnswers = { ...answers, [activeQuestionIndex]: e.target.value };
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        const userAnswer = answers[activeQuestionIndex]?.trim() || "";
        if (userAnswer.length === 0) {
            toast({
                description: "No answer provided. Rating will be set to 0.",
            });
            await UpdateUserAnswer(true);
        } else if (userAnswer.length < 10) {
            toast({
                description: "Error while submitting your answer. Answer length must be greater than 10.",
            });
        } else {
            setLoading(true);
            await UpdateUserAnswer();
            setLoading(false);
        }
    };

    const UpdateUserAnswer = async (isEmptyAnswer = false) => {
        if (!interviewData || !interviewData?.mockId) {
            toast({
                description: "Failed to submit answer. Interview data is missing.",
            });
            console.error("Interview data is missing or incomplete", interviewData);
            return;
        }

        const userAnswer = answers[activeQuestionIndex]?.trim() || "";
        const feedbackPrompt = `Question: ${mockInterviewQues[activeQuestionIndex]?.question}, UserAnswer: ${isEmptyAnswer ? "" : userAnswer}, Depending on user answer for given interview, Please give us rating for answer and feedback as area of improvement if any, In just 3-5 lines to improve in JSON format with rating field and feedback field`;

        try {
            let jsonFeedbackResp = { rating: 0, feedback: "No answer provided." };
            if (!isEmptyAnswer) {
                const result = await chatSession.sendMessage(feedbackPrompt);
                const mockJsonResp = (await result.response.text()).replace('```json', '').replace('```', '').trim();
                console.log("Mock JSON Response:", mockJsonResp);
                jsonFeedbackResp = JSON.parse(mockJsonResp);
            }

            const existingAnswer = await db.select().from(UserAnswer)
                .where(
                    and(
                        eq(UserAnswer.mockIdRef, interviewData.mockId),
                        eq(UserAnswer.question, mockInterviewQues[activeQuestionIndex]?.question),
                        eq(UserAnswer.userEmail, user?.primaryEmailAddress?.emailAddress)
                    )
                );

            if (existingAnswer.length > 0) {
                await db.update(UserAnswer)
                    .set({
                        userAns: userAnswer,
                        feedback: jsonFeedbackResp.feedback,
                        rating: jsonFeedbackResp.rating,
                        createdAt: moment().format("YYYY-MM-DD"),
                    })
                    .where(
                        and(
                            eq(UserAnswer.mockIdRef, interviewData.mockId),
                            eq(UserAnswer.question, mockInterviewQues[activeQuestionIndex]?.question),
                            eq(UserAnswer.userEmail, user?.primaryEmailAddress?.emailAddress)
                        )
                    );
            } else {
                await db.insert(UserAnswer).values({
                    mockIdRef: interviewData.mockId,
                    question: mockInterviewQues[activeQuestionIndex]?.question,
                    correctAnswer: mockInterviewQues[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: jsonFeedbackResp.feedback,
                    rating: jsonFeedbackResp.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("YYYY-MM-DD"),
                });
            }

            toast({
                description: "Answer submitted successfully.",
            });
            // set
        } catch (error) {
            console.error("Failed to parse JSON response", error);
            toast({
                description: "Failed to submit answer. Please try again.",
            });
        }
    };

    return mockInterviewQues && (
        <div className="p-5 border rounded-lg my-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {mockInterviewQues.length > 0 ? (
                    mockInterviewQues.map((item, index) => (
                        <div key={index}>
                            <h2
                                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary'}`}
                                onClick={() => setActiveQuestionIndex(index)}
                            >
                                Question #{index + 1}
                            </h2>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 p-2 text-nowrap">No questions available.</p>
                )}
            </div>
            <h2 className="my-5 text-md md:text-lg">{mockInterviewQues[activeQuestionIndex]?.question}</h2>

            <div className="flex flex-col items-center mt-10 w-full">
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows="5"
                    placeholder="Type your answer here..."
                    value={answers[activeQuestionIndex] || ""}
                    onChange={handleAnswerChange}
                ></textarea>

                <div className="w-full flex justify-end">
                    <Button
                        className="my-3"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Answer"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default QuestionSection;