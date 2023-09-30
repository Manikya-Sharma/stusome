import { Inter, Merriweather, Quicksand, Preahvihear } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-merri",
});
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-quick",
});
const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fancy",
});

export { inter, merriweather, quicksand, preahvihear };
