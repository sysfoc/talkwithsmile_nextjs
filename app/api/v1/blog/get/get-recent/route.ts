// FILE: app/api/v1/blog/get/get-recent/route.ts
import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    const blogs = await Blog.find({})
      .sort({ created_at: -1 })
      .limit(5)
      .select("id slug h1 image created_at category_id")
      .lean();

    if (!blogs || blogs.length === 0) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    const categoryIds = [...new Set(blogs.map((b) => b.category_id))];
    const categories = await Category.find({ id: { $in: categoryIds } })
      .select("id name slug")
      .lean();
    const categoryMap = Object.fromEntries(
      categories.map((c) => [c.id, c])
    );

    const posts = blogs.map((blog) => ({
      ...blog,
      title: blog.h1,
      category: categoryMap[blog.category_id] || null
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching recent posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}