import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/lib/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reminder App",
  description: "This is a reminder app for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={cn(inter.className, "dark")} style={{
        colorScheme: "dark"
      }}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
