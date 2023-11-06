import "./globals.css";
import type { Metadata } from "next";
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
            <h1 className="text-xl font-bold">Tên blog</h1>
            <ul className="flex">
              <li className="mr-4">Trang chủ</li>
              <li className="mr-4">Giới thiệu</li>
              <li className="mr-4">Liên hệ</li>
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
