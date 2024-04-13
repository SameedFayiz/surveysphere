import { genSaltSync, hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Users from "@/models/user";

export async function POST(req, res) {
  const body = await req.json();

  const salt = genSaltSync(10); // Generate salt with salt rounds
  body.password = hashSync(body.password, salt); // Hash password

  try {
    await connectDB();

    const user = await Users.create({ ...body });
    user.password = undefined;

    return NextResponse.json({ message: "Account created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
