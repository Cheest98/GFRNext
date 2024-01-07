import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "../globals.css";
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
  );
}
