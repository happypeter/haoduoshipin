import React, { Component } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'

const Image = styled.img`
  display: block;
  max-width: 100%;
  transition: 175ms ease-in-out;
`

class ImageShift extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mounted: false,
      scrollTop: 0,
      scrollHeight: 0
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true
    })
    this.scrollListener = this.handleScroll()
    this.handleResize = this.handlePageResize()
    window.addEventListener('scroll', this.scrollListener)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener)
    window.removeEventListener('resize', this.handleResize)
  }

  handleScroll() {
    return debounce(() => {
      requestAnimationFrame(() => {
        this.setState({
          scrollTop: document.body.scrollTop
        })
      })
    }, 20)
  }

  handlePageResize() {
    return debounce(() => {
      this.setHeight()
    }, 25)
  }

  setHeight() {
    const { documentElement: html, body } = document

    this.setState({
      scrollHeight: Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      )
    })
  }

  getImageStyle(state = this.state) {
    const { mounted, scrollTop, scrollHeight } = state
    if (mounted) {
      const { clientHeight } = document.body
      const maxHeight = Math.max(scrollHeight - clientHeight, 0)
      let grayscale = 0
      let blur = 0
      if (scrollHeight !== clientHeight) {
        grayscale = scrollTop / maxHeight
        blur = grayscale * 5
      }
      return {
        filter: `grayscale(${grayscale}) blur(${blur}px)`
      }
    }
    return {}
  }

  render() {
    const { src } = this.props
    const style = this.getImageStyle()
    return <Image src={src} style={style} onLoad={() => this.setHeight()} />
  }
}

export default ImageShift
