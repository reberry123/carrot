import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market",
  },
  description: "Sell and buy all the thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-sky-50 h-screen flex items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center
          w-full h-full bg-white rounded-2xl shadow-lg gap-3 p-5">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
