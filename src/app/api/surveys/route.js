import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    await connectDB();

    const surveys = await surveyModel.find();

    return NextResponse.json({ error: false, surveys }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
