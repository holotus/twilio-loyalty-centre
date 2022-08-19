import "normalize.css"
import "react-toggle/style.css" 
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
