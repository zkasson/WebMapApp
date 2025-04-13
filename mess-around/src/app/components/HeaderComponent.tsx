import React from 'react';
import Link from 'next/link';

export default function HeaderComponent() {
  return (
    <header className="p-4 bg-neutral-800 text-white flex justify-between items-center shadow-md" style={{borderRadius: "8px"}} >
      <h1 className="text-2xl font-bold">
        <Link href="/" className="hover:text-gray-300">Mess-Around App</Link>
      </h1>
      <nav>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link href="/counter" className="hover:text-gray-300">Counter</Link>
          </li>
          <li>
            <Link href="/funList" className="hover:text-gray-300">Fun List</Link>
          </li>
          <li>
            <Link href="/awesome" className="hover:text-gray-300">You're Awesome</Link>
          </li>
          <li>
            <Link href="/mapPractice" className="hover:text-gray-300">Map Practice</Link>
          </li>
          <li>
            <Link href="/analyticsPractice" className="hover:text-gray-300">Analytics Practice</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}