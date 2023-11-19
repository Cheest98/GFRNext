
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GFR",
  description: "GFR app",
};
import Navbar from "@/components/shared/Navbar";
import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { SessionProvider } from "next-auth/react";
import RightSidebar from "@/components/shared/RightSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
                <Navbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
          </main>
          </SessionProvider>
    </html>
  )
}