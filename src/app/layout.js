import { Inter } from "next/font/google";
// import "./globals.css";
import './index.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Webfess",
  description: "Made by Izuye",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
