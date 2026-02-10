import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoveLink - Romantic Pages",
  description: "Create memorable romantic experiences",
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
