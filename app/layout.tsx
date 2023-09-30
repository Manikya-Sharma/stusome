import "./globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather, Quicksand, Preahvihear } from "next/font/google";
import NextAuthProvider from "./components/Auth/GlobalAuth";

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-merri",
});
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quick",
});
const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fancy",
});

export const metadata: Metadata = {
  title: "stusome",
  description: "Student Social Media: The social media website you need",
  openGraph: {
    title: "stusome",
    description: "Social media by students, for students",
    type: "website",
    url: "https://stusome.vercel.app",
    siteName: "stusome",
    images: [
      {
        url: "https://stusome.vercel.app/logo.png",
      },
    ],
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " selection:bg-teal-400 selection:text-white"
        }
      >
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
