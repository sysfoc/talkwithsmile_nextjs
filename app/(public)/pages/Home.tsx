// ============================================================================
// FILE: app/(public)/pages/Home.tsx - SERVER COMPONENT VERSION
import HeroSection from "@/app/(public)/components/home/HeroSection";
import EditorsPick from "@/app/(public)/components/home/EditorsPick";
import FeaturedBlogs from "@/app/(public)/components/home/FeaturedBlogs";
import LatestPosts from "@/app/(public)/components/home/LatestPosts";
import Sidebar from "@/app/(public)/components/home/Sidebar";

export const dynamic = 'force-dynamic';

const URLs = [
  "/api/v1/blog/get/latest-posts",
  "/api/v1/blog/get/category-blogs",
  "/api/v1/blog/get/featured-posts",
];

async function fetchAllData() {
  try {
    const responses = await Promise.all(
      URLs.map((url) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store", // Ensures fresh data on each request
        })
      )
    );
    
    const [heroRes, categoryRes, featuredRes] = await Promise.all(
      responses.map((res) => res.json())
    );
    
    return {
      heroData: heroRes.blog,
      categoryData: categoryRes.categories,
      featuredData: featuredRes.blogs,
    };
  } catch (error) {
    console.error("API error:", error);
    return {
      heroData: null,
      categoryData: null,
      featuredData: null,
    };
  }
}

export default async function BlogPage() {
  const { heroData, categoryData, featuredData } = await fetchAllData();
  const loading = false; // Data is already loaded on server

  console.log("this is the featured posts data", featuredData);

  return (
    <section>
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-6 gap-y-5">
        <div className="w-full md:w-[68%]">
          <HeroSection data={heroData} loading={loading} />
          <EditorsPick data={heroData} loading={loading} />
          <FeaturedBlogs data={featuredData} loading={loading} />
        </div>
        <Sidebar />
      </div>
      <LatestPosts data={categoryData} />
    </section>
  );
}