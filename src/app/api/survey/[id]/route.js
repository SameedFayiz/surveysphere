import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = params.id;
  try {
    await connectDB();

    const survey = await surveyModel.findById(id);
    if (!survey) {
      return NextResponse.json(
        { error: true, message: "Survey not found" },
        { status: 404 }
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

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    await connectDB();

    const survey = await surveyModel.findById(id);
    if (!survey) {
      return NextResponse.json(
        { error: true, message: "Survey not found" },
        { status: 404 }
      );
    }
    await surveyModel.deleteOne({ _id: id });
    // await AnswerModel.deleteMany({ survey: req.params.id });

    return NextResponse.json(
      { error: false, message: "Survey deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
