import React from 'react'
import styled from 'styled-components'

import { rhythm } from '../utils/typography'

import NavigationButton from './NavigationButton'
import PostDate from './Date'

const ToolbarContainer = styled.div`
  display: flex;
  padding-bottom: ${rhythm(1 / 4)};
`

export default function PostToolbar({ date, next, prev, title }) {

  const Buttons = () => {
    return (
      <div>
        {prev && (
          <NavigationButton title={title} to={prev} prev>
            上一篇
          </NavigationButton>
        )}
        {next && (
          <NavigationButton title={title} to={next} next>
            下一篇
          </NavigationButton>
        )}
      </div>
    )
  }
  return (
    <ToolbarContainer>
      <Buttons />
      <PostDate date={date} />
    </ToolbarContainer>
  )
}
