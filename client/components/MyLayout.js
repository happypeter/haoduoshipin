import Header from './Header'

const Layout = (props) => (
  <div>
    <Header />
    <div className='main'>
      {props.children}
    </div>
  </div>
)

export default Layout
