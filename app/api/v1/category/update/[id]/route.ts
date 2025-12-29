// app/api/v1/category/update/[id]/route.ts
import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { name, homeh3s, title, description, h1 } = await request.json();
    
    if (!name || !homeh3s || !title || !description || !h1) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    
    const category = await Category.findOne({ id });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    const existingCategory = await Category.findOne({
      id: { $ne: id },
      $or: [{ name }, { slug }]
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { message: "Category with this name or slug already exists" },
        { status: 400 }
      );
    }
    
    const updatedCategory = await Category.findOneAndUpdate(
      { id },
      {
        name,
        slug,
        homeh3s,
        title,
        description,
        h1,
        updated_at: new Date().toISOString(),
      },
      { new: true }
    );
    
    return NextResponse.json(
      { category: updatedCategory, message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
      { status: 500 }
    );
  }
}