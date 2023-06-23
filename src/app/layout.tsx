"use client";

import "./globals.css";
import Navbar from "./dashboard/components/Navbar";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ConfirmationProvider } from "./context/ConfirmationContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ConfirmationProvider>
            <Navbar />
            {children}
          </ConfirmationProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
