import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Job Hunt Dashboard",
  description: "Manage your job applications, resumes, and experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
} 