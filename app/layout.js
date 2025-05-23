import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-cover bg-center bg-no-repeat ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/6110198/pexels-photo-6110198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundPosition: 'center center',
          backgroundSize: 'cover', // Ensures the image covers the entire screen
        }}
      >
        {children}
      </body>
    </html>
  );
}
