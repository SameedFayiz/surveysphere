import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  try {
    await connectDB();
    const { surveyId, answers, ipAddress } = await req.json();

    // Find the survey by its ID
    const survey = await surveyModel.findById(surveyId);

    if (!survey) {
      return NextResponse.json(
        { error: true, message: "Survey not found" },
        { status: 404 }
      );
    }

    await Promise.all(
      Object.entries(answers).map(async ([questionId, answer]) => {
        const question = survey.questions.id(questionId);
        if (!question) {
          return NextResponse.json(
            {
              error: true,
              message: `Question with ID ${questionId} not found`,
            },
            { status: 404 }
          );
        }
        question.answers.push(answer);
      })
    );

    // update the access list
    survey.accessList.push(ipAddress);

    // Save the updated survey
    await survey.save();

    return NextResponse.json(
      { error: false, message: "Survey answers updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
