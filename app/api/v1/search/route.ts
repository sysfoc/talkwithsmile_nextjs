// app/api/v1/search/route.ts
import Blog from "@/app/model/Blog.model";
import Category from "@/app/model/Category.model";
import { connectToDatabase } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDatabase();
  
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    
    if (!query || query.trim() === "") {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    // Split query into words for better matching
    const queryWords = query.trim().split(/\s+/).filter(word => word.length > 0);
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create search conditions for Blog model fields
    const createSearchConditions = (fields: string[]) => {
      return {
        $or: [
          // Exact phrase match (highest priority)
          ...fields.map(field => ({
            [field]: { $regex: `\\b${escapedQuery}\\b`, $options: "i" }
          })),
          // Starts with query (high priority)
          ...fields.map(field => ({
            [field]: { $regex: `^${escapedQuery}`, $options: "i" }
          })),
          // Contains all words (medium priority)
          ...(queryWords.length > 1 ? [{
            $and: queryWords.map(word => ({
              $or: fields.map(field => ({
                [field]: { $regex: word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: "i" }
              }))
            }))
          }] : []),
          // Contains query anywhere (lowest priority)
          ...fields.map(field => ({
            [field]: { $regex: escapedQuery, $options: "i" }
          }))
        ]
      };
    };

    // Search only in Blogs - using h1, meta_title, and meta_desc
    const blogs = await Blog.find(createSearchConditions(["h1", "meta_title", "meta_desc"]))
      .select("id h1 slug image category_id created_at")
      .sort({ created_at: -1 })
      .limit(10)
      .lean();

    if (blogs.length === 0) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    // Get all unique category IDs from blogs
    const categoryIds = [...new Set(blogs.map(blog => blog.category_id))];
    
    // Fetch categories
    const categories = await Category.find({ id: { $in: categoryIds } })
      .select("id name slug")
      .lean();

    // Create a map for quick category lookup
    const categoryMap = Object.fromEntries(
      categories.map(cat => [cat.id, cat])
    );

    // Calculate relevance score
    const calculateRelevance = (text: string, searchQuery: string, words: string[]) => {
      if (!text) return 0;
      
      const lowerText = text.toLowerCase();
      const lowerQuery = searchQuery.toLowerCase();
      let score = 0;

      // Exact match (highest score)
      if (lowerText === lowerQuery) {
        score += 100;
      }
      
      // Starts with query
      else if (lowerText.startsWith(lowerQuery)) {
        score += 50;
      }
      
      // Contains exact phrase with word boundaries
      else if (new RegExp(`\\b${lowerQuery}\\b`, 'i').test(lowerText)) {
        score += 30;
      }
      
      // Contains all words
      else if (words.every(word => lowerText.includes(word.toLowerCase()))) {
        score += 20;
      }
      
      // Contains some words
      else {
        const matchingWords = words.filter(word => 
          lowerText.includes(word.toLowerCase())
        ).length;
        score += (matchingWords / words.length) * 10;
      }

      return score;
    };

    // Process Blogs with category information
    const processedBlogs = blogs.map((blog) => {
      const category = categoryMap[blog.category_id];
      const relevance = calculateRelevance(blog.h1, query, queryWords);
      
      return {
        id: blog.id,
        title: blog.h1,
        slug: blog.slug,
        image: blog.image,
        created_at: blog.created_at,
        type: "blog",
        category: category?.name || "",
        category_slug: category?.slug || "",
        url: category?.slug ? `/${category.slug}/${blog.slug}` : `/blog/${blog.slug}`,
        relevance
      };
    });

    // Filter by minimum relevance and sort by relevance then date
    const results = processedBlogs
      .filter(result => result.relevance > 5)
      .sort((a, b) => {
        // First sort by relevance
        if (b.relevance !== a.relevance) {
          return b.relevance - a.relevance;
        }
        // Then by date if relevance is equal
        const dateA = new Date(a.created_at.replace(" ", "T")).getTime();
        const dateB = new Date(b.created_at.replace(" ", "T")).getTime();
        return dateB - dateA;
      })
      .slice(0, 10)
      .map(({ relevance, ...rest }) => rest);

    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}