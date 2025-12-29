// app/api/v1/blog/update/[id]/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, unlink } from "fs/promises";
import Blog from "@/app/model/Blog.model";
import User from "@/app/model/User.model";
import { connectToDatabase } from "@/app/utils/db";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectToDatabase();
  const { id } = await context.params;
  const formData = await req.formData();

  const h1 = formData.get("h1") as string | null;
  const meta_title = formData.get("meta_title") as string | null;
  const meta_desc = formData.get("meta_desc") as string | null;
  const content = formData.get("content") as string | null;
  const slug = formData.get("slug") as string | null;
  const category_id = formData.get("category_id") as string | null;
  const additional_data = formData.get("additional_data") as string | null;
  const image = formData.get("image");

  try {
    const blogDoc = await Blog.findOne({ id });
    if (!blogDoc) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let imagePath = blogDoc.image;

    if (image instanceof File && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());

      if (blogDoc.image) {
        const oldPath = path.join(process.cwd(), "public","storage", "blogpostimages", blogDoc.image);
        try {
          await unlink(oldPath);
        } catch (err: any) {
          console.warn("Failed to delete old image:", err.message);
        }
      }

      const filename = `${Date.now()}-${image.name}`;
      const fullPath = path.join(process.cwd(), "public", "storage", "blogpostimages", filename);
      await writeFile(fullPath, buffer);
      imagePath = filename;
    }

    const currentTimestamp = new Date().toISOString();

    const updatedBlogDoc = await Blog.findOneAndUpdate(
      { id },
      {
        h1,
        meta_title,
        meta_desc,
        content,
        slug,
        image: imagePath,
        category_id,
        additional_data: additional_data || null,
        updated_at: currentTimestamp,
        post_updated_on: currentTimestamp,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlogDoc) {
      return NextResponse.json({ message: "Failed to update blog" }, { status: 500 });
    }

    const updatedBlog = updatedBlogDoc.toObject();

    let user = null;
    if (updatedBlog.user_id) {
      const userDoc = await User.findOne({ id: updatedBlog.user_id }).select("name email");
      user = userDoc ? { name: userDoc.name, email: userDoc.email } : null;
    }

    const finalBlog = {
      ...updatedBlog,
      user,
    };

    return NextResponse.json({ blog: finalBlog }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}