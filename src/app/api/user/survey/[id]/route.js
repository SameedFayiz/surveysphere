import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const ipAddress = searchParams.get("ip");

  if (!ipAddress && !title) {
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 404 }
    );
  }

  try {
    await connectDB();

    const survey = await surveyModel.findOne({ _id: id, surveyTitle: title });
    if (!survey) {
      return NextResponse.json(
        { error: true, message: "Survey not found" },
        { status: 404 }
      );
    }
    if (survey.accessList.includes(ipAddress)) {
      return NextResponse.json(
        {
          error: true,
          message: "Access denied",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: false, survey }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
