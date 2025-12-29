// app/api/v1/comment/get/[id]/route.ts
import Comment from "@/app/model/Comment.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  
  try {
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }
    
    // Only fetch approved comments (status: "1") or all if you want pending ones too
    const comments = await Comment.find({ 
      post_id: id,
      // status: "1" // Uncomment to show only approved comments
    }).sort({ created_at: -1 });
    
    return NextResponse.json({ comment: comments }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
