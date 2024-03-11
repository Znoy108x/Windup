import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Separator } from "@/shared/components/ui/separator";
import NavBar from "@/app/(main)/_components/NavBar";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/components/ui/toaster";
import Providers from "@/shared/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RemindMe",
  description: "Created by: @CodeWithKliton",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(inter.className, "dark")}
        style={{
          colorScheme: "dark",
        }}
      >
        <body>
          <Providers>
            <div className=" flex min-h-screen w-full flex-col items-center dark:bg-beutral-950">
              <NavBar />
              <Separator />
              <main className="flex flex-grow w-full justify-center items-center dark:bg-neutral-950">
                {children}
                <Toaster />
              </main>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
