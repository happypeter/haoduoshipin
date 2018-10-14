import React, { Component } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { animateBackground, animateShake } from '../css/animations'
import particlesConfig from '../data/particles-config.json'

import '../css/particle-styles.css'
import config from '../../config'

const Header = styled.header`
  height: ${props => (props.isPost ? '15vh' : '25vh')};
  background-color: #00bcd4;
  color: blue;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#0097a7, #00bcd4);
  background-size: 250% 250%;
  animation: ${animateBackground} 10s ease infinite;
  font-weight: 400;
  transition: height 250ms ease-in-out;
  user-select: none;
  @media only screen and (min-width: 768px) {
    height: ${props => (props.isPost ? '30vh' : '45vh')};
  }
`

const Name = styled.h1`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  transition: font-size 250ms ease-in-out, padding 150ms ease-in;
  background-color: #002635;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0;
  width: auto;
  user-select: text;
  @media only screen and (min-width: 375px) {
    font-size: 2rem;
  }
  @media only screen and (min-width: 768px) {
    font-size: 3.5rem;
    padding: 1rem 2rem;
  }
`

const Letter = styled.span`
  display: inline-block;
  position: relative;
  z-index: 3;
  &:hover {
    animation: ${animateShake} 1000ms ease-in-out;
  }
`

const Domain = styled.span`
  font-weight: 400;
  white-space: nowrap;
`

const StyledLink = styled(Link)`
  color: inherit;
`

class BlogHeader extends Component {
  async componentDidMount() {
    this.Particles = await import('@dschau/particles.js').then(
      ({ default: Particles }) => Particles
    )
    this.Particles('blog-header', particlesConfig)
    const cx = '001989019782093346340:qmzhvdcc730'
    const gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.async = true
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(gcse, s)
  }

  render() {
    return (
      <Header id="blog-header" {...this.props}>
        <Name className="name">
          <StyledLink to="/">
            <Domain>
              {'好多视频网'.split('').map((letter, index) => (
                <Letter key={`${letter}-${index}`}>{letter}</Letter>
              ))}
            </Domain>
          </StyledLink>
        </Name>
        <div style={{ zIndex: 999 }}>
          <div
            className="gcse-searchbox-only"
            data-resultsurl={config.returnUrl}
            data-queryparametername="q"
          />
        </div>
      </Header>
    )
  }
}

export default BlogHeader
