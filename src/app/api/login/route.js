import { NextResponse } from "next/server";
import Users from "@/models/user";
import connectDB from "@/lib/dbConnect";
import { compareSync } from "bcrypt";

export async function POST(req, res) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: true, message: "Invalid request" },
      { status: 500 }
    );
  }
  try {
    await connectDB();

    const user = await Users.findOne({ email: email });
    if (!user) {
      return NextResponse.json(
        { error: true, message: "This email doesn't Exist" },
        { status: 404 }
      );
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: true, message: "Password is not valid" },
        { status: 401 }
      );
    }
    user.password = undefined;

    return NextResponse.json(
      {
        error: false,
        message: "User authenticated",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, errorBody: error, message: "Internal server error" },
      { status: 500 }
    );
  }
}
