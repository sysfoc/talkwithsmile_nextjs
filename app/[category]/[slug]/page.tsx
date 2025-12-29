// app/[category]/[slug]/page.tsx
import { cache } from "react";
import Detail from "@/app/(public)/pages/Detail";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

const getBlogData = cache(async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blog/by-slug/${slug}`,
      {
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getBlogData(slug);
  
  return {
    title: data?.blog?.meta_title || "Blog not found",
    description: data?.blog?.meta_desc || "Blog not found",
  };
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getBlogData(slug);

  if (!data?.blog) {
    return (
      <main className="mx-4 md:mx-12 my-8">
        <p>Blog not found</p>
      </main>
    );
  }

  return (
    <main>
      <Detail blog={data.blog} />
    </main>
  );
}