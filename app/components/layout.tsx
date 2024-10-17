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
        <div>
            <Navbar />
            <header>
                <h1>My App</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                </nav>
            </header>
            <main>{children}</main>
            <Footer />   
        </div>
    );
};

export default Layout;
