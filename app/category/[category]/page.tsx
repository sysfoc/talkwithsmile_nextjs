// app/category/[category]/page.tsx
import { cache } from "react";
import Category from "@/app/(public)/pages/Category";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

const getCategoryData = cache(async (categorySlug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/get-by-category/${categorySlug}`,
      {
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const data = await getCategoryData(category);
  
  return {
    title: data?.category?.title || "Category does not exist",
    description: data?.category?.description || "Category does not exist",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const data = await getCategoryData(category);

  if (!data?.category) {
    return (
      <main className="mx-4 md:mx-12 my-8">
        <p>Category not found</p>
      </main>
    );
  }

  return (
    <main>
      <Category categoryInfo={data.category} />
    </main>
  );
}