import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Your name",
    template: "%s | Your name",
  },
  description: "Your description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* navbar */}
        <nav className=" bg-slate-300 w-full py-3">
          <div className=" max-w-6xl m-auto flex justify-between">
            <Link href="/">
              <h1 className="font-bold text-xl">Your logo</h1>
            </Link>

            <ul className="flex">
              <Link href="/" className="mr-4">
                Trang chủ
              </Link>
              <Link href="/gioi-thieu" className="mr-4">
                Giới thiệu
              </Link>
              <Link href="/lien-he" className="mr-4">
                Liên hệ
              </Link>
            </ul>
          </div>
        </nav>
        {children}
        {/* footer */}
        <footer className="bg-slate-300 w-full py-3">
          <div className=" max-w-6xl m-auto flex justify-between">
            <p>© 2023, All rights reserved.</p>
            <p>Powered by Your name</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
