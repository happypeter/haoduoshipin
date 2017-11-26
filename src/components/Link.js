import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Link from 'gatsby-link'

import { getColorFromString } from '../utils/color'

const getColors = props => {
  const color = getColorFromString(props.title)
  return `
      background-color: ${color};
      color: white;
      border-color: ${color};
      &:hover {
        color: ${color};
        background-color: white;
      }
    `
}

export default styled(Link)`
  display: inline-block;
  background-color: white;
  padding: ${rhythm(1 / 3)} ${rhythm(1)};
  font-size: ${rhythm(3 / 4)};
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  border-width: 2px;
  border-style: solid;
  transition: all 125ms ease-in-out;
  font-family: sans-serif;
  ${props => getColors(props)};
`
