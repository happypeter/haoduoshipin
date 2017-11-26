import React from "react"
import Link from 'gatsby-link'

import Preview from '../components/Preview'

export default ({ data }) => {
  const {edges: posts} = data.allIndexJson

  return (
    <div>
      {posts
        .slice()
        .reverse()
        .map(({node: post}) => {
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
  )
}

// allIndexJson 中的 Index 对应文件名
export const pageQuery = graphql`
  query IndexQuery {
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
