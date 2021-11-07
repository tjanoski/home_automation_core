import '../global.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <div style={{width: '100%', height: '100%'}}>
        <Component {...pageProps} />
      </div>
  )
}

export default MyApp
