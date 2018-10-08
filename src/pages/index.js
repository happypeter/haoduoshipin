import React from 'react'
import { graphql } from 'gatsby'
import Preview from '../components/Preview'
import Layout from '../components/layout'

export default ({ data, location }) => {
  const { edges: posts } = data.allIndexJson
  return (
    <Layout location={location}>
      <div>
        {posts
          .slice()
          .reverse()
          .map(({ node: post }) => {
            return (
              <div key={post.id}>
                <Preview
                  issue={post.id}
                  date={post.created_at}
                  title={post.title}
                  to={`/videos/${post.id}`}
                />
              </div>
            )
          })}
      </div>
    </Layout>
  )
}

// allIndexJson 中的 Index 对应文件名
export const pageQuery = graphql`
  query IndexQuery {
    allIndexJson {
      edges {
        node {
          id
          title
          name
          created_at
        }
      }
    }
  }
`
