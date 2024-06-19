import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
import { AuthContextProvider } from './firebase/AuthContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Engima | AI&ML Club IIITK',
  description: 'Join Us, Official AI ML Club of IIIT Kottyam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 

  return (
    <html lang="en" className="dark">
      <Head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
        
      </Head>
      <body className={`${inter.className} `}>
      <AuthContextProvider>
          {children}
        </AuthContextProvider>
        <script src="./login.js"></script>
      </body>
    </html>
  );
}
