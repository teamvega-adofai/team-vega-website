import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Page } from '../layout'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps & { Component: Page }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}
export default MyApp
