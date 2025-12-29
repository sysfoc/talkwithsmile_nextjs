// app/(admin)/components/blog-posts/AddBlogPost.tsx
"use client";
import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const LazyJoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface FormData {
  h1: string;
  content: string;
  image: File | null;
  slug: string;
  meta_title: string;
  meta_desc: string;
  category_id: string;
  additional_data: string;
}

const AddBlogPost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  
  const [formData, setFormData] = useState<FormData>({
    h1: "",
    content: "",
    image: null,
    slug: "",
    meta_title: "",
    meta_desc: "",
    category_id: "",
    additional_data: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/v1/category/get-all", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const config = {
    placeholder: "Start typing...",
    height: 500,
    uploader: {
      insertImageAsBase64URI: true,
    },
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    processPasteHTML: true,
    events: {
      paste: (event: any) => {
        console.log("Paste event triggered");
        return true;
      },
      focus: () => {
        console.log("Editor focused");
      },
    } as any,
  };

  const handleContentChange = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "h1") {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
      }

      return updated;
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category_id: value,
    }));
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("h1", formData.h1);
      form.append("content", formData.content);
      form.append("meta_title", formData.meta_title);
      form.append("meta_desc", formData.meta_desc);
      form.append("slug", formData.slug);
      form.append("category_id", formData.category_id);
      form.append("additional_data", formData.additional_data);

      if (formData.image) {
        form.append("image", formData.image);
      }

      const res = await fetch("/api/v1/blog/add", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/blog-posts");
        setFormData({
          h1: "",
          content: "",
          image: null,
          slug: "",
          meta_title: "",
          meta_desc: "",
          category_id: "",
          additional_data: "",
        });
      } else {
        setError(true);
        setErrorMessage(data.message || "Failed to create blog");
      }
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormData} encType="multipart/form-data" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline text-sm">{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="meta_title">Meta Title</Label>
          <Input
            type="text"
            id="meta_title"
            name="meta_title"
            placeholder="Meta Title"
            className="border border-black placeholder:text-black"
            required
            value={formData.meta_title}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="meta_desc">Meta Description</Label>
          <Input
            type="text"
            id="meta_desc"
            name="meta_desc"
            placeholder="Meta Description"
            className="border border-black placeholder:text-black"
            required
            value={formData.meta_desc}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="h1">Title (H1)</Label>
          <Input
            type="text"
            id="h1"
            name="h1"
            placeholder="Blog Title"
            className="border border-black placeholder:text-black"
            required
            value={formData.h1}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            type="text"
            id="slug"
            name="slug"
            placeholder="Slug (auto-generated)"
            className="border border-black placeholder:text-black bg-gray-50"
            required
            readOnly
            value={formData.slug}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="category_id">Category</Label>
          <Select value={formData.category_id} onValueChange={handleCategoryChange}>
            <SelectTrigger className="border border-black">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: any) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="additional_data">Additional Data (Optional)</Label>
          <Input
            type="text"
            id="additional_data"
            name="additional_data"
            placeholder="Additional Data"
            className="border border-black placeholder:text-black"
            value={formData.additional_data}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Featured Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="border border-black placeholder:text-black"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="flex flex-col col-span-1 sm:col-span-2 gap-2">
          <Label>Blog Content</Label>
          <Suspense fallback={<p>Loading editor...</p>}>
            <LazyJoditEditor
              value={formData.content}
              config={config}
              tabIndex={1}
              onBlur={handleContentChange}
            />
          </Suspense>
        </div>
      </div>

      <div className="mt-6">
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Blog Post"}
        </button>
      </div>
    </form>
  );
};

export default AddBlogPost;