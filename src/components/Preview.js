import React from 'react'

import Post from './Post'

export default function Preview({ children, date, issue, title, to, ...rest }) {
  return (
    <Post issue={issue} title={title} linkTo={to} date={date} title={title} preview {...rest}>
      {children}
    </Post>
  )
}
