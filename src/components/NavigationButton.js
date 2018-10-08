import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { FaBackward, FaForward } from 'react-icons/fa'

import { getColorFromString } from '../utils/color'
import { rhythm } from '../utils/typography'

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  background-color: ${props => (props.title ? 'transparent' : 'white')};
  color: ${props => (props.title ? 'white' : '#002635')};
  text-decoration: none;
  padding: 0 ${rhythm(1 / 2)};
  height: ${rhythm(1.5)};
  line-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: all 125ms ease-in-out;
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: ${rhythm(1 / 2)};
  z-index: 2;
  &:hover {
    background-color: ${props => (props.title ? 'white' : '#002635')};
    color: ${props =>
      props.title ? getColorFromString(props.title) : 'white'};
  }
  .content {
    display: none;
    padding: 0 ${rhythm(1 / 4)};
  }
  .icon {
    font-size: ${rhythm(3 / 4)};
  }
  @media only screen and (min-width: 768px) {
    .content {
      display: inline-block;
      white-space: nowrap;
    }
  }
`

const A = StyledLink.withComponent('a')

const Prev = styled(StyledLink)`
  left: 0;
`

const Next = styled(StyledLink)`
  right: 0;
`

const PrevA = styled(A)`
  left: 0;
`

const NextA = styled(A)`
  right: 0;
`

export default function BackButton({
  absolute,
  children,
  to,
  next,
  prev,
  target = '_blank',
  ...rest
}) {
  let Container = prev ? Prev : Next
  let props = {
    to,
    ...rest
  }
  if (absolute) {
    Container = prev ? PrevA : NextA
    props = {
      href: to,
      target,
      ...rest
    }
  }
  return (
    <Container {...props}>
      {prev && <FaBackward className="icon" />}
      <span className="content">{children}</span>
      {next && <FaForward className="icon" />}
    </Container>
  )
}
