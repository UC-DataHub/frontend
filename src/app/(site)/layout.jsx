/* prettier-ignore-file */
/* eslint-disable */

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Lines from '@/components/Lines';
import ScrollToTop from '@/components/ScrollToTop';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import '../globals.css';
import ToasterContext from '../context/ToastContext';
import { Provider } from 'react-redux';
import NextTopLoader from 'nextjs-toploader';
import StoreProvider from '@/redux/StoreProvider';
import { headers } from 'next/headers';
import AuthWatcher from '@/components/Auth/AuthWatcher';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: "MulphaseHUB",
    template: "%s | MulphaseHUB",
  },
  description: "MulphaseHUB is a collaborative platform for sharing and accessing structured multiphase datasets from simulations and experiments. Upload, browse, and download high-quality datasets with rich metadata and folder hierarchy.",
};

async function getUser() {
  // const incomingHeaders = await headers();
  // const cookie = incomingHeaders.get('cookie') || '';

  // // First try accessing user
  // let res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/user`, {
  //   cache: 'no-store',
  //   credentials: 'include',
  //   headers: {
  //     cookie: cookie,
  //   },
  // });

  // if (res.status === 403 || res.status === 401) {
  //   // Try refreshing access token
  //   const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/refresh`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       cookie: cookie,
  //     },
  //   });

  //   if (refreshRes.ok) {
  //     // Try again to get user with the new token
  //     res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/user`, {
  //       cache: 'no-store',
  //       credentials: 'include',
  //       headers: {
  //         cookie: cookie,
  //       },
  //     });
  //   }
  // }

  // if (!res.ok) return null;

  // const data = await res.json();
  // return data.user;

  return null;
}




export default async function RootLayout({ children }) {
  const user = await getUser()

  return (
    <StoreProvider preloadedState={{ auth: { user, loading: false, error: null } }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`dark:bg-black ${inter.className}`}>
          <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
            <AuthWatcher />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem/>
            <NextTopLoader color="#8b5cf6" />
            <Lines />
            <ToasterContext />
            <div className='flex flex-col min-h-screen'>
              <Header />
              {children}
              <Footer />
            </div>
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  )
}