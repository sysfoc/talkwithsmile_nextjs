// app/api/v1/blog/add/route.ts
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";
import Blog from "@/app/model/Blog.model";
import path from "path";
import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import { config } from "@/app/utils/env-config";
import jwt from "jsonwebtoken";
import User from "@/app/model/User.model";

export async function POST(req: Request) {
  await connectToDatabase();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, config.jwtSecretKey as string) as {
    id: string;
  };

  if (!decoded.id) {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  const userId = decoded.id;
  const formData = await req.formData();

  const h1 = formData.get("h1") as string | null;
  const meta_title = formData.get("meta_title") as string | null;
  const meta_desc = formData.get("meta_desc") as string | null;
  const content = formData.get("content") as string | null;
  const slug = formData.get("slug") as string | null;
  const image = formData.get("image") as File | null;
  const category_id = formData.get("category_id") as string | null;
  const additional_data = formData.get("additional_data") as string | null;

  if (!h1 || !meta_title || !meta_desc || !content || !slug || !image || !category_id) {
    return NextResponse.json(
      { message: "Please fill all required fields" },
      { status: 400 }
    );
  }

  const user = await User.findOne({ id: userId });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const existingBlog = await Blog.findOne({ slug });
  if (existingBlog) {
    return NextResponse.json(
      { message: "Blog with this slug already exists" },
      { status: 400 }
    );
  }

  try {
    const allBlogs = await Blog.find({}, { id: 1 }).lean();

    let maxBlogId = 0;
    allBlogs.forEach((blog) => {
      const parsedId = parseInt(blog.id);
      if (!isNaN(parsedId) && parsedId > maxBlogId) {
        maxBlogId = parsedId;
      }
    });

    const nextId = (maxBlogId + 1).toString();

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const imagePath = path.join(
      process.cwd(),
      "public",
      "storage",
      "blogpostimages",
      filename
    );
    await writeFile(imagePath, buffer);

    const currentTimestamp = new Date().toISOString();

    const blog = await Blog.create({
      id: nextId,
      slug,
      h1,
      meta_title,
      meta_desc,
      content,
      image: filename,
      view_counter: "0",
      user_id: userId,
      category_id,
      additional_data: additional_data || null,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
      post_updated_on: null,
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}