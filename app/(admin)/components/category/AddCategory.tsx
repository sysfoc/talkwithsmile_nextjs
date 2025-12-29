// app/(admin)/components/category/AddCategory.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React from "react";

const AddCategory = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    homeh3s: "",
    title: "",
    description: "",
    h1: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/category/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push("/admin/category");
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setErrorMessage("Something went wrong");
    }
  };
  return (
    <form onSubmit={handleFormData}>
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
          Create
        </button>
      </div>
    </form>
  );
};

export default AddCategory;