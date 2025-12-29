// FILE 3: app/(public)/pages/Category.tsx
"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/app/(public)/components/category/HeroSection";
import CategoryPosts from "@/app/(public)/components/category/CategoryPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";

interface Props {
  categoryInfo: any;
}

const Category = ({ categoryInfo }: Props) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    if (!categoryInfo?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const blogRes = await fetch(
        `/api/v1/blog/get-by-category/${categoryInfo.id}`,
        { 
          method: "GET",
          cache: "no-store"
        }
      );
      
      if (!blogRes.ok) {
        throw new Error("Failed to load blogs");
      }
      
      const blogData = await blogRes.json();
      setBlogs(blogData.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [categoryInfo?.id]);

  return (
    <div>
      <HeroSection categoryInfo={categoryInfo} />
      <section className="mx-4 md:mx-12 my-8 flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5">
        <div className="w-full md:w-[68%]">
          {loading ? (
            <p>Loading blogs...</p>
          ) : (
            <CategoryPosts blogs={blogs} categorySlug={categoryInfo?.slug} />
          )}
        </div>
        <Sidebar />
      </section>
    </div>
  );
};

export default Category;