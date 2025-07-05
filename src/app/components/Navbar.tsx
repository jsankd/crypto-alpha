"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "코인 가격 확인", path: "/price" },
    { name: "온체인 지표 확인", path: "/onchain" },
    { name: "Alpha Research", path: "/research" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 flex space-x-4 justify-center">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`px-4 py-2 rounded hover:bg-blue-500 ${
            pathname === item.path ? "bg-blue-800" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
