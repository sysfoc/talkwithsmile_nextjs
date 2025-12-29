// app/api/v1/comment/add/route.ts
import Comment from "@/app/model/Comment.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { config } from "@/app/utils/env-config";
import jwt from "jsonwebtoken";
import User from "@/app/model/User.model";

export async function POST(req: Request) {
  await connectToDatabase();
  
  // Get token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify token and extract user_id
  let userId: string;
  try {
    const decoded = jwt.verify(token, config.jwtSecretKey as string) as {
      id: string;
    };
    
    if (!decoded.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    
    userId = decoded.id;
  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }

  try {
    const { post_id, fname, lname, email, body, status } = await req.json();
    
    if (!post_id || !fname || !lname || !email || !body) {
      return NextResponse.json(
        { message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await User.findOne({ id: userId });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    // Generate incremented comment id (highest one)
    const allComments = await Comment.find({}, { id: 1 }).lean();
    
    let maxCommentId = 0;
    allComments.forEach(comment => {
      const parsedId = parseInt(comment.id);
      if (!isNaN(parsedId) && parsedId > maxCommentId) {
        maxCommentId = parsedId;
      }
    });
    
    const nextId = (maxCommentId + 1).toString();
    
    const currentTimestamp = new Date().toISOString();
    
    const newComment = await Comment.create({
      id: nextId,
      post_id,
      user_id: userId, // Use authenticated user's ID
      parent_id: null,
      fname,
      lname,
      email,
      body,
      status: status || "0", // Default to pending
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    });
    
    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}