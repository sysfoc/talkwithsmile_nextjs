// app/(public)/components/navbar/MobileNav.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const MobileNav = ({ navLinks }: { navLinks: any }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-700'>
          <Menu className='h-6 w-6 text-gray-300' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuItem asChild>
          <Link href='/'>Home</Link>
        </DropdownMenuItem>
        {navLinks.map((link: any, index: number) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={`/category/${link.slug}`} className='capitalize'>
              {link.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;