"use client";

import { Lightbulb } from "lucide-react";
import Image from "next/image";
import Webcam from "react-webcam";

function RecordAnswerSection() {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* Webcam Section */}
            <div className="flex flex-col mt-20 justify-center items-center p-3 bg-black rounded-lg relative">
                <Image
                    src={"/webcam.png"}
                    width={200}
                    height={200}
                    className="absolute z-0"
                    alt="Webcam Icon"
                    priority={true}
                />
                <Webcam
                    mirrored={true}
                    style={{
                        width: "150%",
                        height: 300,
                        zIndex: 10,
                    }}
                />
            </div>
            {/* Note Section */}
            <div className="border rounded-lg p-5 bg-blue-100 mt-5">
                <div className="flex gap-2 items-center text-primary">
                    <Lightbulb />
                    <h2 className="font-bold">Note:
                        <span className="text-sm text-primary my-2"> {process.env.NEXT_PUBLIC_QUESTION_NOTE}</span>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default RecordAnswerSection;