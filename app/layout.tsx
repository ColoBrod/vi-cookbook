import type { Metadata } from "next";
import './globals.css';
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CookBook for Vi",
  description: "CookBook for Vi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
