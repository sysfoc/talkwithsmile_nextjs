// app/(public)/components/navbar/Navlinks.tsx
"use client";
import Link from "next/link";

const Navlinks = ({ navLinks }: { navLinks: any }) => {
  return (
    <nav className='hidden md:flex items-center gap-x-8'>
      {navLinks.map((link: any, index: number) => (
        <Link
          key={index}
          href={`/category/${link.slug}`}
          className='text-sm font-medium capitalize text-gray-100 transition-colors'
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;