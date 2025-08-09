import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyGolfType - Golf Personality Assessment",
  description: "Discover your golf personality type",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
