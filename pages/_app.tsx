import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Page } from '../layout'
import NextNProgress from 'nextjs-progressbar'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps & { Component: Page }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <NextNProgress
        options={{
          easing: 'ease',
          speed: 500
        }}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        color="#fff"
      />
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}
export default MyApp
