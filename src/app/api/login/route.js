import { NextResponse } from "next/server";
import Users from "@/models/user";
import connectDB from "@/lib/dbConnect";
import { compareSync } from "bcrypt";

export async function POST(req, res) {
  const { email, password } = await req.json();

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

    const token = "dhohofq08yfqeoheefq4864654rweg46we"; // Random token
    return NextResponse.json(
      {
        error: false,
        message: "User authenticated",
        user,
        token: token,
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
