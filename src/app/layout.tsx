// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "../providers/StoreProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LaundryHub",
  description: "Laundry Management Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            {/* Sidebar on the left */}
            <AppSidebar />

            {/* Main content area */}
            <main className="flex-1 p-4">
              <StoreProvider>
                <SidebarTrigger />
                {children}
              </StoreProvider>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
