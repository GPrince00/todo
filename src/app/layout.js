import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "Todo List",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&family=Young+Serif&display=swap"
        rel="stylesheet"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
