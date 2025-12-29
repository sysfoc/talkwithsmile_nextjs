"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import Link from "next/link";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/v1/user/contact/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await res.json();
      setLoading(false);
      if (res.ok) {
        setFormData({
          fname: "",
          lname: "",
          email: "",
          message: "",
        });
        alert("Message sent successfully");
      } else {
        setLoading(false);
        alert("Something went wrong, please try again later");
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <>
      {/* TOP SECTION — paste here */}
      <section className="bg-gradient-to-r from-[#FE4F70] to-[#FFA387] dark:from-gray-900 dark:to-gray-800">
        <div className="py-16 flex items-center justify-center">
          <div className="flex flex-col gap-y-2">
            <h1 className="font-bold text-3xl text-white text-center capitalize">
              Contact Us
            </h1>
            <div className="flex justify-center items-center text-white gap-x-2">
              <Link href="/">
                <span>Home / </span>
              </Link>
              <span className="capitalize">contact-us</span>
            </div>
          </div>
        </div>
      </section>
      <div className="min-h-screen py-12 flex items-center justify-center bg-white dark:bg-gray-900 px-4">
        <Card className="w-full max-w-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6 pb-8 px-6 md:px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label
                    htmlFor="fname"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    First Name
                  </Label>
                  <Input
                    id="fname"
                    name="fname"
                    placeholder="Enter your first name"
                    className="border-gray-300 dark:border-gray-600 focus:border-[#FE4F70] focus:ring-[#FE4F70]"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    htmlFor="lname"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lname"
                    name="lname"
                    placeholder="Enter your last name"
                    className="border-gray-300 dark:border-gray-600 focus:border-[#FE4F70] focus:ring-[#FE4F70]"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-300 dark:border-gray-600 focus:border-[#FE4F70] focus:ring-[#FE4F70]"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="message"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message..."
                  rows={10}
                  className="border-gray-300 dark:border-gray-600 focus:border-[#FE4F70] focus:ring-[#FE4F70] resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FE4F70] to-[#FFA387] hover:opacity-90 text-white font-semibold rounded-lg py-3 cursor-pointer transition-opacity disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Contact;
