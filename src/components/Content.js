import React from 'react'
import styled from 'styled-components'

const Content = styled.main`
  position: absolute;
  top: ${props => (props.isPost ? '15vh' : '25vh')};
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: 840px;
  z-index: 2;
  @media only screen and (min-width: 768px) {
    top: ${props => (props.isPost ? '25vh' : '40vh')};
  }
`

function MainContent({ children, ...rest }) {
  return (
    <Content {...rest}>
      {children}
    </Content>
  )
}

export default MainContent
