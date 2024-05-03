import connectDB from "@/lib/dbConnect";
import surveyModel from "@/models/survey";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized access" },
      { status: 401 }
    );
  }
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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized access" },
      { status: 401 }
    );
  }
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

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: true, message: "Unauthorized access" },
      { status: 401 }
    );
  }
  const id = params.id;
  try {
    await connectDB();
    const updates = await req.json();
    console.log(updates);
    if (!updates) {
      return NextResponse.json(
        { error: true, message: "Invalid request" },
        { status: 500 }
      );
    }

    const survey = await surveyModel.findByIdAndUpdate(id, { ...updates });
    if (!survey) {
      return NextResponse.json(
        { error: true, message: "Survey not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ error: false, survey }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
