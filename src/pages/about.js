import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'

// import SocialIcons from './SocialIcons'

import me from '../images/peter.jpeg'

const Root = styled.section`
  position: relative;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  background-color: white;
  outline: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${rhythm(1)};
  :last-child {
    border-bottom-width: 0;
  }
  @media only screen and (min-width: 768px) {
    padding-bottom: ${rhythm(2)};
  }
`

const Container = styled.div`
  display: flex;
  margin: ${rhythm(1)} auto;
  margin-bottom: 0;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media only screen and (min-width: 768px) {
    max-width: 75%;
  }
`

const Image = styled.img`
  width: ${rhythm(3)};
  height: ${rhythm(3)};
  border-radius: ${rhythm(3)};
  @media only screen and (min-width: 768px) {
    width: ${rhythm(5)};
    height: ${rhythm(5)};
    border-radius: ${rhythm(5)};
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 ${rhythm(1 / 2)};
  @media only screen and (min-width: 768px) {
    margin: 0 ${rhythm(1)};
  }
`

const Name = styled.h1`
  margin: 0;
  padding: 0;
  padding-bottom: ${rhythm(1 / 4)};
  font-family: sans-serif;
  font-size: ${rhythm(1)};
  color: #002635;
  text-transform: uppercase;
  line-height: ${rhythm(1)};
`

const Description = styled.p`
  margin-bottom: 0;
  color: #444;
  font-family: 'Bitter', sans-serif;
`

export default function About() {
  return (
    <Root>
      <Container>
        <Image src={me} />
        <Details>
          <Name>
            happypeter
          </Name>
          <Description>
            <div>好奇猫CEO</div>
          </Description>
        </Details>
        {/* <SocialIcons /> */}
      </Container>
    </Root>
  )
}
