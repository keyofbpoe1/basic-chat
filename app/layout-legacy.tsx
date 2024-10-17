import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <Head>
//         <title>Fallacy Bingo</title>
//         <meta name="description" content="Play bingo with logical fallacies!" />
//         <link rel="icon" type="image/png" href="/favicon.ico" />
//       </Head> 
//       <div
//         className={`${inter.className} min-h-screen flex flex-col relative pb-20`}
//       >
//          <Navbar />
//           <main>{children}</main>
//         <Footer />
//         {/* <div id="root">
//           {children}
//         </div> */}
//       </div>
//     </>
//   );
// }

 


  export default function RootLayout({ children }: { children: React.ReactNode }) {
    // return children
    return (
      <html>
        <body>
          {children}
        </body>
      </html>
    )
  }