import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = (props) => (
  <Layout>
    <ul className='card-list'>
      {props.shows.reverse().map((show) => (
        <li key={show.id}>
        <Link as={`/v/${show.id}`} href={`/video?id=${show.id}`}>
          <a className='card-item'>
            <span className='card-item-left'>
              {show.id}
            </span>
            <span className='card-item-right'>
              {show.title}
            </span>
         </a>
       </Link>
        </li>
      ))}
    </ul>
    <style jsx global>{`
      body {
        box-sizing: border-box;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif;
        font-size: 15px;
        color: #404040;
        background: #f7f8fa;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        line-height: 1.8;
        margin: 0;
      }
      a {
        color: #00bcd4;
        text-decoration: none;
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
      }`}
    </style>
    <style jsx>{`
      .card-list {
        max-width: 960px;
        margin: 0 auto;
      }
      .card-item {
        display: flex;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .7);
        margin: 20px 0;
        height: 60px;
      }
      .card-item-left {
        display: block;
        background: #00bcd4;
        flex-basis: 120px;
        flex-shrink: 0;
        text-align: center;
        line-height: 60px;
        color: white;
      }
      .card-item-right {
        display: block;
        padding-left: 10px;
        line-height: 60px;
        color: rgba(0, 0, 0, .8);
      }
      `}
    </style>
  </Layout>
)

Index.getInitialProps = async function() {
  const res = await fetch('https://raw.githubusercontent.com/happypeter/haoduoshipin/master/src/posts.json')
  // maybe I should use api.github.com ？
  const data = await res.json()
  console.log(data)
  return {
    shows: data
  }
}

export default Index
