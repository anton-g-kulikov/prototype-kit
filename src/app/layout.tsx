import type { Metadata } from "next";
import "./globals.css";
import { CommentSystem } from "@/components/Comments";
import { SettingsProvider } from "@/lib/SettingsContext";

export const metadata: Metadata = {
  title: "Prototype Kit",
  description: "Interactive Prototype Framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        <SettingsProvider>
          <CommentSystem>
            {children}
          </CommentSystem>
        </SettingsProvider>
      </body>
    </html>
  );
}
