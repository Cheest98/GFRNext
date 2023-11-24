import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import SessionProvider from "../SessionProvider";
import "../globals.css";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/BottomBar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GFR",
  description: "GFR app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" bg-dark-1">
        <SessionProvider>
          <Navbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Bottombar />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
