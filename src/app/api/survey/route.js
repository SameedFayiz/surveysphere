import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";
import { testUser } from "@/models/user";

export async function POST(req, res) {
  try {
    await connectDB();
    const { surveyTitle, description, questions } = await req.json();

    const survey = await surveyModel.create({
      user: testUser,
      surveyTitle,
      description,
      questions,
    });
    return NextResponse.json({ error: false, survey }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
