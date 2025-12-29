// app/api/v1/auth/login/route.ts
import { NextResponse } from "next/server";
import { comparePassword } from "@/app/utils/hashing";
import { config } from "@/app/utils/env-config";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/utils/db";
import User from "@/app/model/User.model";

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await connectToDatabase();

  let body: LoginRequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Please fill all fields" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters long" },
      { status: 400 }
    );
  }

  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }
    
    const isPasswordMatch = await comparePassword(
      password,
      isUserExist.password
    );
    
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    let token: string;
    try {
      token = jwt.sign(
        { id: isUserExist.id, user_id: isUserExist.id },
        config.jwtSecretKey as string,
        {
          expiresIn: "1d",
        }
      );
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to create token" },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user: {
          _id: isUserExist.id,
          name: isUserExist.name,
          email: isUserExist.email,
          created_at: isUserExist.created_at,
          updated_at: isUserExist.updated_at,
        },
      },
      { status: 200 }
    );
    
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Error logging in user", error: (err as Error).message },
      { status: 500 }
    );
  }
}