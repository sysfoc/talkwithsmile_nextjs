// ============================================================================
// FILE: app/api/v1/blog/get/featured-posts/route.ts
import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    // Fetch all blogs
    const allBlogs = await Blog.find({})
      .select("id slug h1 meta_desc image created_at category_id user_id view_counter")
      .lean();

    if (!allBlogs || allBlogs.length === 0) {
      return NextResponse.json({ blogs: [] }, { status: 200 });
    }

    // Filter blogs with view_counter > 100 and sort by created_at
    const featuredBlogs = allBlogs
      .filter((blog) => {
        const views = parseInt(blog.view_counter) || 0;
        return views > 100;
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateB - dateA;
      })
      .slice(0, 4);

    // If no featured blogs, fallback to recent blogs
    let finalBlogsList = featuredBlogs;
    if (featuredBlogs.length === 0) {
      finalBlogsList = allBlogs
        .sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        })
        .slice(0, 4);
    }

    const userIds = [...new Set(finalBlogsList.map((b) => b.user_id))];
    const users = await User.find({ id: { $in: userIds } })
      .select("id name")
      .lean();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u.name]));

    const categoryIds = [...new Set(finalBlogsList.map((b) => b.category_id))];
    const categories = await Category.find({ id: { $in: categoryIds } })
      .select("id name slug")
      .lean();
    const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

    const finalBlogs = finalBlogsList.map((blog) => ({
      ...blog,
      title: blog.h1,
      description: blog.meta_desc,
      author: userMap[blog.user_id] || "Anonymous",
      category: categoryMap[blog.category_id] || null,
      views: blog.view_counter
    }));

    return NextResponse.json({ blogs: finalBlogs }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching featured posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}