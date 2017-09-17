import Link from 'next/link'

const Header = () => (
    <div className='header'>
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
