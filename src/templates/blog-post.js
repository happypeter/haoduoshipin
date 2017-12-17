import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Post from '../components/Post'

import { fadeInBottom } from '../css/animations'

import 'prismjs/themes/prism-okaidia.css'

const Container = styled.div`
  max-width: 100%;
  transform: translateY(16px) scale(0.99);
  transform-origin: 50% 0;
  opacity: 0;
  animation: ${fadeInBottom} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`

export default function BlogPost({ data = {}, location, pathContext }) {
  const { markdownRemark: detail } = data
  const {edges: posts} = data.allIndexJson

  const {slug} = pathContext
  const pid = slug.split('/')[2]
  const selected = posts.filter(({node: post}) => {
    return post.id === pid
  })
  const metaData = selected[0].node
  const prev = Number(pid) === posts.length ? false :  `/videos/${Number(pid) + 1}`
  const next = Number(pid) === 1 ? false : `/videos/${Number(pid) - 1}`

  const videoArea = `
    <div>
      <video controls style='width: 100%'>
        <source src="http://haoduo-1253322599.costj.myqcloud.com/${metaData.name}.mp4" type="video/mp4"></source>
        <p>Your browser does not support the video element.</p>
      </video>
    </div>
  `

  const meta = [
    {
      name: `article:author`,
      content: 'happypeter'
    }
  ]

  return (
    <Container>
      <Helmet title={`${metaData.title}`} meta={meta} />
      <Post
        html={videoArea + detail.html}
        linkTo='/'
        title={metaData.title}
        date={metaData.created_at}
        prev={prev}
        next={next}
      />
    </Container>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
    }
    allIndexJson {
      edges {
        node {
          id,
          title,
          name,
          created_at
        }
      }
    }
  }
`
