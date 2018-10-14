import React from 'react'
import styled from 'styled-components'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'

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

class Search extends React.Component {
  comoponentDidMount() {
    const cx = '001989019782093346340:qmzhvdcc730'
    const gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.async = true
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(gcse, s)
  }

  render() {
    const { location } = this.props
    return (
      <Layout location={location}>
        <Root>
          <Container>
            <div className="gcse-searchresults-only" />
          </Container>
        </Root>
      </Layout>
    )
  }
}

export default Search
