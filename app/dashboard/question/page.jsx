import Link from 'next/link';
import questions from '@/data/questions';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Lock } from "lucide-react";

function Questions() {
    return (
        <div className="p-10">
            <div className="mb-5">
                <h2 className="text-3xl font-bold text-primary">Some Sample Questions</h2>
            </div>
            <div>
                {questions.slice(0, 7).map((item, index) => (
                    <Collapsible key={index} className="mb-5">
                        <CollapsibleTrigger className="p-2 bg-secondary rounded-md my-2 text-left flex justify-between gap-7 w-full">
                            <h2>{index + 1}: {item.question}</h2>
                            <ChevronDown className="h-5 w-5" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="mt-4 bg-green-100 p-2 rounded-lg border">
                                <h2 className="font-bold">Answer:</h2>
                                <p className="mt-2 text-green-900 text-sm">{item.correctAnswer}</p>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
                {questions.length > 7 && (
                    <Link href="/dashboard/upgrade">
                        <div className="mt-5 p-4 border rounded-lg shadow-md bg-yellow-50 flex justify-between cursor-pointer">
                            <p className="text-yellow-500">Upgrade to unlock more questions and answers.</p>
                            <Lock className='h-5 w-5 text-yellow-500'/>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Questions;