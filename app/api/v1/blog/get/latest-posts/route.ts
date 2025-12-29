// FILE: app/api/v1/blog/get/latest-posts/route.ts
import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    const blogs = await Blog.find({})
      .sort({ created_at: -1 })
      .limit(6)
      .select("id slug h1 content image created_at category_id user_id")
      .lean();

    if (!blogs || blogs.length === 0) {
      return NextResponse.json({ blog: [] }, { status: 200 });
    }

    const userIds = [...new Set(blogs.map((b) => b.user_id))];
    const users = await User.find({ id: { $in: userIds } })
      .select("id name")
      .lean();
    const userMap = Object.fromEntries(
      users.map((u) => [u.id, u.name])
    );

    const categoryIds = [...new Set(blogs.map((b) => b.category_id))];
    const categories = await Category.find({ id: { $in: categoryIds } })
      .select("id name slug")
      .lean();
    const categoryMap = Object.fromEntries(
      categories.map((c) => [c.id, c])
    );

    const blog = blogs.map((b) => ({
      _id: b._id,
      id: b.id,
      title: b.h1,
      content: b.content,
      slug: b.slug,
      image: b.image,
      created_at: b.created_at,
      uploaded_by: userMap[b.user_id] || "Anonymous",
      category: categoryMap[b.category_id] || null
    }));

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching latest posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}