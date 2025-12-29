// app/api/v1/blog/get/nav-links/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/db";
import Category from "@/app/model/Category.model";

export async function GET() {
  try {
    await connectToDatabase();
    
    const categories = await Category.find({})
      .select("name slug")
      .lean();

    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch navigation links" },
      { status: 500 }
    );
  }
}