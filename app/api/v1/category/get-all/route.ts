// app/api/v1/category/get-all/route.ts
import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  
  try {
    const categories = await Category.find({})
      .sort({ created_at: -1 })
      .select("id name slug homeh3s title description h1 created_at updated_at");
    
    return NextResponse.json(
      { categories, count: categories.length },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}