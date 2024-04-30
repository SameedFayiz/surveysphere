import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized access" },
      { status: 401 }
    );
  }
  try {
    await connectDB();
    const { user, surveyTitle, description, questions } = await req.json();
    if (!surveyTitle || !description || !questions || !user) {
      return NextResponse.json(
        { error: true, message: "Invalid request" },
        { status: 500 }
      );
    }

    const survey = await surveyModel.create({
      user,
      surveyTitle,
      description,
      questions,
      status: "active",
      category: "not-set", //TODO: implement category
    });
    return NextResponse.json({ error: false, survey }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
