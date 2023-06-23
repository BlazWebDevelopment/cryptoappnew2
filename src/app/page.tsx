"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center pt-[17rem] ">
        <h1 className="text-4xl font-bold">CRYPTO DATABASE</h1>
      </div>
      <div className="flex justify-center pt-[10rem]">
        <div className="max-w-7xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Link
              href="/login"
              className="relative px-7 py-6 bg-black ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6"
            >
              <div className="space-y-2">
                <div className="block text-white group-hover:text-gray-400 transition duration-200">
                  <button onClick={() => signIn()}>Dashboard →</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
