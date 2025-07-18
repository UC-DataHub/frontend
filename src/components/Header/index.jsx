'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, logout } from '@/redux/authSlice' // ✅ Your Redux actions
import ThemeToggler from './ThemeToggler'
import menuData from './menuData'
import EmailVerificationBanner from './EmailVerificationBanner'
import { resendVerificationEmail } from '@/utils/auth'

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [dropdownToggler, setDropdownToggler] = useState(false)
  const [stickyMenu, setStickyMenu] = useState(false)
  const [pendingCount, setPendingCount] = useState(0);

  const user = useSelector((state) => state.auth.user)

  const pathUrl = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchUser()) // ✅ Try to get current user on mount
  // }, [dispatch])

  useEffect(() => {
    dispatch(fetchUser());

    const fetchPendingCount = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/users/');
        setPendingCount(res.data.length);
      } catch (err) {
        console.error('Failed to fetch pending users count');
      }
    };

    if (user?.is_account_verifier) {
      fetchPendingCount();
    }

  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout())
    router.push('/')
  }

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 40)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleStickyMenu)
    return () => window.removeEventListener('scroll', handleStickyMenu)
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full bg-white shadow dark:bg-black`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 sm:px-8 flex 2xl:px-0">
        <div className="flex w-full mx-4 sm:mx-0 my-0 sm:my-0 items-center justify-between sm:w-1/4 sm:w-1/3">
          <Link href="/" className="flex items-center">
            <div className="sm:w-68 w-32 h-16 sm:h-22 flex items-center">
              <Image
                src="/LogoV1.png"
                width={200}
                height={100}
                alt="Logo"
                className="object-contain w-full h-full p-3"
              />
            </div>
          </Link>

          <button
            aria-label="hamburger Toggler"
            className="block sm:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            {/* Hamburger button */}
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-8 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0.0s] duration-200 ease-in-out dark:bg-white`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white `}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white `}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div
          className={`invisible h-0 w-full items-center justify-between sm:visible sm:flex sm:h-auto sm:w-full ${
            navigationOpen &&
            'navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection sm:h-auto sm:p-0 sm:shadow-none sm:dark:bg-transparent'
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-5 sm:flex-row xl:items-center sm:gap-10">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && 'group relative'}>
                  {menuItem.submenu ? (
                    <>
                      <div
                        // onClick={() => setDropdownToggler(!dropdownToggler)}
                        onClick={() => {
                          if (menuItem.path) { // If the menu item has a path, navigate to it
                            router.push(menuItem.path)
                          }
                          setDropdownToggler(!dropdownToggler)
                        }}
                        className={`flex cursor-pointer items-center justify-between gap-3 hover:text-primary ${
                        pathUrl === menuItem.path
                          ? 'text-primary hover:text-primary'
                          : 'hover:text-primary'
                          }
                        `}
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </div>

                      <ul className={`dropdown ${dropdownToggler ? 'flex' : ''}`}>
                        <li className="hover:text-primary border-b border-gray-200 pb-4 mb-2">
                          <Link
                            href={menuItem.path || '#'}
                            className={
                              pathUrl === menuItem.path
                                ? 'text-primary hover:text-primary'
                                : 'hover:text-primary'
                            }
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                        {menuItem.submenu.slice(1,).map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link href={item.path || '#'}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? 'text-primary hover:text-primary'
                          : 'hover:text-primary'
                      }
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-6 sm:mt-0">
            <ThemeToggler />
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Hello, {user.name || user.email} 👋
                </span>
                {user?.is_account_verifier && (
                  <div className="relative">
                    <Link
                      href="/verify-users"
                      className="flex items-center justify-center rounded-lg border border-green-600 px-5 py-2 text-sm text-green-400 hover:bg-green-600 hover:text-white transition"
                    >
                      Verify Users
                    </Link>
                    {pendingCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-red-500 border-2 border-black dark:border-black"></span>
                    )}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center rounded-lg border border-primary px-7.5 py-2.5 text-regular dark:text-white text-primary hover:text-primary ease-in-out hover:border-primaryho"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-regular font-medium text-waterloo hover:text-primary"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/select"
                  className="flex items-center justify-center rounded-lg bg-primary px-7.5 py-2.5 text-regular text-white ease-in-out hover:bg-primaryho"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* {user && !user.is_verified && (
        <div className="bg-yellow-100 border-t border-yellow-400 text-yellow-800 px-4 py-2 text-sm text-center flex sm:flex-row flex-col sm:gap-10 gap-1 items-center justify-center">
          <span>Please check your inbox (and spam folder) to verify your email. Verification is required to access all features.</span>
          <button
            onClick={resendVerificationEmail}
            className="underline text-blue-600 hover:text-blue-800"
          >
            Resend verification email
          </button>
        </div>
      )}
      <EmailVerificationBanner/> */}

    </header>
  )
}

export default Header
