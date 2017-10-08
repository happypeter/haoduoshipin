import Link from 'next/link'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Header = () => (
  <div className='header'>
    <Head>
      <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
    </Head>
    <Link href="/">
      <a>Home</a>
    </Link>
    <style jsx>{`
      .header {
        box-sizing: border-box；
        background: #00bcd4;
        height: 60px;
        padding-left: 20px;
      }
      a {
        color: white;
        line-height: 60px;
        text-decoration: none;
      }
      `}
    </style>
  </div>
)

export default Header
