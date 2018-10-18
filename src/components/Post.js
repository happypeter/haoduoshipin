import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { MdList } from 'react-icons/md'
import PostTitle from './PostTitle'
import Toolbar from './PostToolbar'
import StyledLink from './Link'
import { rhythm } from '../utils/typography'
import '../css/posts.css'

injectGlobal`
  h1.post-title {
    text-align: center;
    font-weight: 700;
    display: inline-block;
  }

  .post-content h2 {
    color: #333;
    margin: ${rhythm(1 / 4)} 0;
    padding: ${rhythm(1 / 4)} 0;
    border-bottom: 2px solid #ddd;
    font-weight: 400;
  }

  .post-content h3 {
    display: inline-block;
    color: #444;
    margin: ${rhythm(1 / 6)} 0;
    padding: ${rhythm(1 / 6)};
    padding-left: 0;
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }

  .post-content p {
    margin: ${rhythm(3 / 4)} auto;
    color: #333;
    line-height: ${rhythm(1.25)};
  }
`

const Post = styled.section`
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
    margin-bottom: ${props => (props.preview ? rhythm(2) : 0)};
    padding-bottom: ${rhythm(2)};
  }
`

const PostContents = styled.div`
  max-width: 100%;
  padding: ${rhythm(3 / 4)} ${rhythm(1)};
  @media only screen and (min-width: 768px) {
    padding: ${rhythm(1)} ${rhythm(2)};
  }
`

const Title = styled.h1`
  font-size: ${rhythm(5 / 6)};
  line-height: ${rhythm(1)};
  text-align: center;
  margin-bottom: 0;
  @media only screen and (min-width: 768px) {
    font-size: ${rhythm(1)};
    line-height: ${rhythm(1.5)};
  }
`

const Divider = styled.hr`
  border: 0;
  width: 75%;
  margin: ${rhythm(1 / 2)} auto;
  border-bottom: 1px solid #eee;
`

const ListIcon = styled(MdList)`
  font-size: 32px;
  margin-right: 0.5rem;
`

const AllPostsContainer = styled.span`
  display: flex;
  align-items: center;
`

const Date = styled.div`
  color: #757575;
  text-align: center;
  font-size: ${rhythm(1 / 2)};
  font-weight: 400;
  @media only screen and (min-width: 768px) {
    font-size: ${rhythm(3 / 4)};
  }
`

const EditLink = styled.a`
  color: #d85d15;
  width: 100%;
  text-align: right;
  padding: 0 ${rhythm(2)} ${rhythm(1)};
  margin-top: -${rhythm(1)};
  font-size: 12px;
`

export default function({
  children,
  date,
  html: __html,
  title,
  next,
  prev,
  linkTo,
  issue,
  videoName,
  id,
  ...rest
}) {
  const isPost = (truthy, falsy = null) => {
    if (linkTo === '/') {
      return truthy
    }
    return falsy
  }

  let videoLink = null
  if (videoName) {
    if (videoName.slice(0, 2) === 'av') {
      videoLink = (
        <a
          href={`https://www.bilibili.com/video/${videoName}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          到 B 站观看视频
        </a>
      )
    } else {
      videoLink = (
        <a
          href={`http://haoduo-1253322599.costj.myqcloud.com/${videoName}.mp4`}
        >
          下载视频
        </a>
      )
    }
  }

  return (
    <Post className="post" {...rest}>
      {isPost(
        <PostTitle title={title} to={isPost(false, linkTo)} issue={issue}>
          <Toolbar title={title} date={date} next={next} prev={prev} />
        </PostTitle>,
        <PostTitle title={title} to={linkTo} issue={issue} />
      )}

      {isPost(
        <PostContents>
          {videoLink}
          <div className="post-content" dangerouslySetInnerHTML={{ __html }} />
          {children}
          <Divider />
        </PostContents>,
        <PostContents>
          <Divider />
          <Title>{title}</Title>
          <Divider />
          <Date>{date}</Date>
        </PostContents>
      )}

      {isPost(
        <EditLink
          href={`https://github.com/happypeter/haoduoshipin/tree/master/posts/videos/${id}.md`}
        >
          Edit this page on GitHub
        </EditLink>
      )}

      <StyledLink to={linkTo} title={title}>
        {isPost(
          <AllPostsContainer>
            <ListIcon />
            All posts
          </AllPostsContainer>,
          'Read more'
        )}
      </StyledLink>
    </Post>
  )
}
