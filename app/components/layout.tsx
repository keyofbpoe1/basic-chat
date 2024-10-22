import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

import localFont from "next/font/local";
import '@/app/globals.css';
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${inter.className} min-h-screen flex flex-col relative pb-20`}>
            <Navbar />
            <main>{children}</main>
            <Footer />   
        </div>
    );
};

export default Layout;
