// app/api/v1/dashboard/statistics/route.ts
import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import Comment from "@/app/model/Comment.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  connectToDatabase();
  try {
    const users = await User.find().countDocuments();
    const blogs = await Blog.find().countDocuments();
    const categories = await Category.find().countDocuments();
    const comments = await Comment.find().countDocuments();
    
    const data = { 
      users, 
      blogs,  // This is now correct (from Blog model)
      categories,
      comments 
    };
    
    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}