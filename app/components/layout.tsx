import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

import localFont from "next/font/local";
import '@/app/globals.css';
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

/**
 * The root layout component. It renders a navbar, the main content, and a footer.
 * The main content is passed as the `children` prop.
 * The layout is a `div` with a minimum height of the viewport and a flexbox column layout.
 * The content is rendered inside the `main` element, which is a child of the `div`.
 * The navbar and footer are rendered inside their own elements, which are also children of the `div`.
 * The layout uses the Geist Sans and Geist Mono fonts.
 * The layout is responsive and works well on different screen sizes.
 */
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
