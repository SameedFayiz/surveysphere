import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

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
    if (!updates) {
      return NextResponse.json(
        { error: true, message: "Invalid request" },
        { status: 500 }
      );
    }

    const user = await userModel.findByIdAndUpdate(id, { ...updates });
    if (!user) {
      return NextResponse.json(
        { error: true, message: "User not found" },
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
