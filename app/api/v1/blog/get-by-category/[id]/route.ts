// app/api/v1/blog/get-by-category/[id]/route.ts
import Blog from "@/app/model/Blog.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  
  try {
    const { id } = await context.params;
    
    const blogs = await Blog.find({ category_id: id })
      .select("-__v")
      .sort({ created_at: -1 })
      .lean();

    if (blogs.length === 0) {
      return NextResponse.json({ blogs: [] }, { status: 200 });
    }

    // Get unique user IDs from blogs
    const userIds = [...new Set(blogs.map((b) => b.user_id).filter(Boolean))];
    
    // Fetch all users in one query
    const users = await User.find({ id: { $in: userIds } })
      .select("id name email")
      .lean();

    // Create a map for quick user lookup
    const userMap = Object.fromEntries(
      users.map((u) => [u.id, { name: u.name, email: u.email }])
    );

    // Attach user data to each blog
    const blogsWithUsers = blogs.map((blog) => ({
      ...blog,
      user: blog.user_id ? userMap[blog.user_id] || null : null,
    }));
    
    return NextResponse.json({ blogs: blogsWithUsers }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}