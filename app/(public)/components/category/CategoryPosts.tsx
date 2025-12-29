"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pagination from "@/app/(admin)/components/common/Pagination";

interface Props {
  blogs: any[];
  categorySlug: string;
}

const ITEMS_PER_PAGE = 15;

const CategoryPosts = ({ blogs: data, categorySlug }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  if (data.length === 0) {
    return (
      <div className="border border-gray-200/70 rounded-xl p-8 text-center">
        <p className="text-gray-500">No posts found in this category.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border border-gray-200/70 rounded-xl overflow-x-hidden">
        <div className="p-4">
          <div className="flex flex-col">
            {paginatedData?.map((post, index) => (
              <div
                key={post?.id || post?._id}
                className={`flex items-center flex-wrap md:flex-nowrap gap-x-5 pb-4 ${
                  index !== 0 ? "pt-4 border-t border-gray-200/70" : ""
                }`}
              >
                <div className="w-full md:w-[300px] h-[300px] md:h-[200px] rounded-md overflow-hidden relative shrink-0">
                  <Image
                    src={`/storage/blogpostimages/${post?.image}`}
                    alt={post?.h1 || "blog-image"}
                    fill
                    className="object-cover"
                    fetchPriority="high"
                    priority={index < 3}
                  />
                </div>
                <div className="break-words">
                  <div className="my-3 flex items-center gap-x-5">
                    <div className="flex items-center gap-x-3">
                      <div className="relative w-8 h-8">
                        <Image
                          src="/blog-img.jpg"
                          alt="profile"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-sm font-semibold">
                        {post?.user?.name || "Anonymous"}
                      </p>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-[#FE4F70]" />
                    <p className="text-sm">
                      {new Date(post?.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Link href={`/${categorySlug}/${post?.slug}`}>
                    <h3 className="font-bold text-xl hover:text-[#FE4F70] transition-colors">
                      {post?.h1}
                    </h3>
                  </Link>
                  <p className="text-gray-400 my-2 line-clamp-2">
                    {post?.meta_desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={data.length}
        />
      )}
    </div>
  );
};

export default CategoryPosts;