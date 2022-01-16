import '../styles/globals.css'
import '../styles/admin.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="height100p">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
