import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AOSInit } from '../util/aoss'



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FaceTrack",
  description: "Created By Alex Bhusal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AOSInit />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
