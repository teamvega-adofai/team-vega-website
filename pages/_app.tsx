import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Page } from '../layout'
import 'grapesjs/dist/css/grapes.min.css'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps & { Component: Page }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider session={session}>
      <div style={{ display: 'none' }} id="grapesjs-headless" />
      <Head>
        <title>Team Vega</title>
      </Head>
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
