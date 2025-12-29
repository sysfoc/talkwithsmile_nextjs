// app/(admin)/components/category/EditCategory.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";

const EditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    homeh3s: "",
    title: "",
    description: "",
    h1: "",
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const getCategoryById = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/category/get-single-category/${params.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      setFormData({
        id: data.category.id || "",
        name: data.category.name || "",
        homeh3s: data.category.homeh3s || "",
        title: data.category.title || "",
        description: data.category.description || "",
        h1: data.category.h1 || "",
      });
      setIsDataLoaded(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage("Something went wrong");
    }
  };
  
  useEffect(() => {
    getCategoryById();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/category/update/${formData.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          homeh3s: formData.homeh3s,
          title: formData.title,
          description: formData.description,
          h1: formData.h1,
        }),
      });
      await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/admin/category");
      } else {
        setError(true);
        setErrorMessage("Failed to update category");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage("Something went wrong");
    }
  }
  
  return (
    <form onSubmit={handleFormData}>
      {!isDataLoaded ? (
        <div className='text-center py-8'>Loading...</div>
      ) : (
        <>
          {error && (
            <div className='mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
              <span className='block sm:inline text-sm'>{errorMessage}</span>
            </div>
          )}
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Category name</Label>
              <Input
                type='text'
                id='name'
                name='name'
                placeholder='Enter Name'
                className='border border-black placeholder:text-black'
                required
                autoComplete='off'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='homeh3s'>Home H3s</Label>
              <Input
                type='text'
                id='homeh3s'
                name='homeh3s'
                placeholder='Enter Home H3s'
                className='border border-black placeholder:text-black'
                required
                autoComplete='off'
                value={formData.homeh3s}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='title'>Meta Title</Label>
              <Input
                type='text'
                id='title'
                name='title'
                placeholder='Enter Meta Title'
                className='border border-black placeholder:text-black'
                required
                autoComplete='off'
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='description'>Meta Description</Label>
              <Input
                type='text'
                id='description'
                name='description'
                placeholder='Enter Meta Description'
                className='border border-black placeholder:text-black'
                required
                autoComplete='off'
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='h1'>H1 Title</Label>
              <Input
                type='text'
                id='h1'
                name='h1'
                placeholder='Enter H1 Title'
                className='border border-black placeholder:text-black'
                required
                autoComplete='off'
                value={formData.h1}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mt-6'>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] cursor-pointer text-white rounded-full text-sm'
            >
              Update
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditCategory;