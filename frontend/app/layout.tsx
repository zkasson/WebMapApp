import "./globals.css";
import { Inter } from "next/font/google";
import type React from "react"; // Import React
import { ClimbProvider } from "@/components/api/climbDatabaseApi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Climbing Locations Map",
  description: "Interactive map of climbing locations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClimbProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClimbProvider>
  );
}
