// app/api/v1/category/add/route.ts
import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, homeh3s, title, description, h1 } = await req.json();

  if (!name || !homeh3s || !title || !description || !h1) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  try {
    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category with this name or slug already exists" },
        { status: 400 }
      );
    }

    // Generate incremented category id (highest one)
    const allCategories = await Category.find({}, { id: 1 }).lean();

    let maxCategoryId = 0;
    allCategories.forEach((cat) => {
      const parsedId = parseInt(cat.id);
      if (!isNaN(parsedId) && parsedId > maxCategoryId) {
        maxCategoryId = parsedId;
      }
    });

    const nextId = (maxCategoryId + 1).toString();
    const currentTimestamp = new Date().toISOString();

    const category = await Category.create({
      id: nextId,
      name,
      slug,
      homeh3s,
      title,
      description,
      h1,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
    });

    return NextResponse.json(
      { category, message: "Category created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
