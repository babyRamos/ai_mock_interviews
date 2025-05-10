import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
    getFeedbackByInterviewId,
    getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const InterviewDetails = async ({ params }: RouteParams) => {
    const { id } = await params;

    const user = await getCurrentUser();

    const interview = await getInterviewById(id);
    if (!interview) redirect("/");

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });

    return (
        <section className="section-feedback">
            <div className="flex flex-row justify-between">
                <h1 className="text-4xl font-semibold">
                    Feedback on the Interview -{" "}
                    <span className="capitalize">{interview.role}</span> Interview
                </h1>
            </div>

            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-row gap-2 items-center">
                        <Image src="/star.svg" alt="star" width={22} height={22} />
                        <p>
                            Overall Impression:{" "}
                            <span className="text-primary-200 font-bold">
                            {feedback?.totalScore}
                        </span>
                            /100
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                        <p>
                            {feedback?.createdAt
                                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <hr />

            <p>{feedback?.finalAssessment}</p>

            <div className="flex flex-col gap-4">
                <h2>Breakdown of the Interview</h2>
                {feedback?.categoryScores?.map((category, index) => (
                    <div key={index}>
                        <p className="font-bold">
                            {index + 1}. {category.name} ({category.score}/100)
                        </p>
                        <p>{category.comment}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <h3>Strength</h3>
                <ul>
                    {feedback?.strengths?.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3">
                <h3>Areas for Improvement</h3>
                <ul>
                    {feedback?.areasForImprovement?.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons">
                <Button className="btn-secondary flex-1">
                    <Link href="/" className="flex w-full justify-center">
                        <p className="text-sm font-semibold text-primary-200 text-center">
                            Back to Dashboard
                        </p>
                    </Link>
                </Button>
            </div>

            <Agent
                userName={user?.name!}
                userId={user?.id}
                interviewId={id}
                type="interview"
                questions={interview.questions}
                feedbackId={feedback?.id}
            />
        </section>
    );

};

export default InterviewDetails;