import Layout from '../components/MyLayout'
import Player from '../components/Player'
import Content from '../components/Content'
import fetch from 'isomorphic-unfetch'

let marked = require('marked');
let hljs = require("highlight.js");

    marked.setOptions({
    renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight:function(code){return hljs.highlightAuto(code).value;}
    });


class Video extends React.Component {
  render () {
    return (
      <Layout>
        <div className='title-wrap'>
          <h1>{this.props.item.title}</h1>
          <p>{this.props.item.created_at}</p>
        </div>
        <div className='player-wrap'>
          <Player name={this.props.item.name} />
        </div>
        <div className='content-wrap'>
          <Content content={this.props.show}/>
        </div>
        <style jsx>{`
          .title-wrap {
            background: #00bcd4;
            text-align: center;
            color: white;
            padding-top: 40px;
            padding-bottom: 40px;
          }
          h1 {
            margin: 0;
          }
          .player-wrap, .content-wrap {
            display: block;
            max-width: 960px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
          }
          .content-wrap {
            background: white;
          }
          `}
        </style>
      </Layout>
    )
  }
}


Video.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.github.com/repos/happypeter/haoduoshipin/contents/data/videos/${id}.md`)
  const show = await res.json()
  console.log(show.content)
  var utf8encoded = (new Buffer(show.content, 'base64')).toString('utf8');
  // see also: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
  console.log('utf8 text:', utf8encoded)
  const resIndex = await fetch('https://raw.githubusercontent.com/happypeter/haoduoshipin/master/data/index.json')
  // maybe I should use api.github.com ？
  const arr = await resIndex.json()
  const item = arr.find(t => t.id == id)

  return {
    show: marked(utf8encoded),
    item
  }
}

export default Video
