import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import styled from 'styled-components'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    })
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/ video.js /pull/3856
  render() {
    return (
      <Wrap>
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} className='video-js' />
        </div>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  width: 100%;
  video {
    width: 100%;
  }
`