import { useAnalytics } from '~/lib/analytics'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useAnalytics()

  return <Component {...pageProps} />
}

export default MyApp
