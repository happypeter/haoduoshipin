import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import Post from '../components/Post'

import 'prismjs/themes/prism-okaidia.css'

const Container = styled.div`
  max-width: 100%;
  transform: translateY(16px) scale(0.99);
  transform-origin: 50% 0;
`

export default function BlogPost({ data = {}, location, pathContext }) {
  const { markdownRemark: detail } = data
  const {edges: posts} = data.allIndexJson

  const {slug} = pathContext
  const pid = slug.split('/')[2]
  const selected = posts.filter(({node: post}) => {
    return post.id === pid
  })
  if(!selected[0]) return console.log('check your index.json file')
  const metaData = selected[0].node
  const prev = Number(pid) === posts.length ? false :  `/videos/${Number(pid) + 1}`
  const next = Number(pid) === 1 ? false : `/videos/${Number(pid) - 1}`



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
        html={detail.html}
        videoName={metaData.name}
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
