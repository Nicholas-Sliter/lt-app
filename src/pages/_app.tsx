import '../styles/globals.css'
import type { AppProps } from 'next/app'
import HeaderFooter from '../layouts/HeaderFooter'

function MyApp({ Component, pageProps }: AppProps) {
  return <HeaderFooter><Component {...pageProps} /></HeaderFooter>;
}

export default MyApp
