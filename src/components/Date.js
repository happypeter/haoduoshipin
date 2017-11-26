import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

const PostDate = styled.h2`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: ${rhythm(3 / 4)};
  font-weight: 400;
  z-index: 2;
`

export default function DateDisplay({ date }) {
  return <PostDate>{date}</PostDate>
}
