import { genSaltSync, hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import userModel from "@/models/user";

export async function POST(req, res) {
  let { firstName, lastName, email, password } = await req.json();
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }

  const salt = genSaltSync(10); // Generate salt with salt rounds
  password = hashSync(password, salt); // Hash password

  try {
    let db = await connectDB();
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });
    user.password = undefined;

    return NextResponse.json({ message: "Account created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
