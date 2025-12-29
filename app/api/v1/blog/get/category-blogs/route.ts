// FILE: app/api/v1/blog/get/category-blogs/route.ts
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
      .select("id slug h1 image created_at user_id category_id")
      .lean();

    if (!blogs || blogs.length === 0) {
      return NextResponse.json({ categories: [] }, { status: 200 });
    }

    // Fetch users
    const userIds = [...new Set(blogs.map((b) => b.user_id))];
    const users = await User.find({ id: { $in: userIds } })
      .select("id name")
      .lean();
    const userMap = Object.fromEntries(
      users.map((u) => [u.id, u.name])
    );

    // Fetch categories
    const categoryIds = [...new Set(blogs.map((b) => b.category_id))];
    const categories = await Category.find({ id: { $in: categoryIds } })
      .select("id name slug")
      .lean();
    const categoryMap = Object.fromEntries(
      categories.map((c) => [c.id, c])
    );

    // Group blogs by category (4 per category)
    const categoryGroups: { [key: string]: any } = {};

    blogs.forEach((blog) => {
      const category = categoryMap[blog.category_id];
      if (!category) return;

      if (!categoryGroups[blog.category_id]) {
        categoryGroups[blog.category_id] = {
          name: category.name,
          slug: category.slug,
          blogs: []
        };
      }

      if (categoryGroups[blog.category_id].blogs.length < 4) {
        categoryGroups[blog.category_id].blogs.push({
          _id: blog._id,
          id: blog.id,
          title: blog.h1,
          slug: blog.slug,
          image: blog.image,
          created_at: blog.created_at,
          uploaded_by: userMap[blog.user_id] || "Anonymous"
        });
      }
    });

    const categoryArray = Object.values(categoryGroups);
    return NextResponse.json({ categories: categoryArray }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching category blogs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}