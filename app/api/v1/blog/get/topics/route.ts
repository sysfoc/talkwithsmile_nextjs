// FILE: app/api/v1/blog/get/topics/route.ts
import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();

  try {
    const blogs = await Blog.find({}).select("category_id").lean();

    // Count blogs per category
    const countMap: { [key: string]: number } = {};
    blogs.forEach((blog) => {
      countMap[blog.category_id] = (countMap[blog.category_id] || 0) + 1;
    });

    const categoryIds = Object.keys(countMap);
    const categories = await Category.find({ id: { $in: categoryIds } })
      .select("id name slug")
      .lean();

    const topics = categories.map((category) => ({
      categoryName: category.name,
      categorySlug: category.slug,
      count: countMap[category.id] || 0,
    }));

    return NextResponse.json({ topics }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
