import Link from 'next/link'
import posts from '../data/posts'

const postList = posts.map((p, i) => {
  return (
    <div key={p.id}>
      <Link href={`post?id=${p.id}&${p.name}`}>
        {p.title}
      </Link>
    </div>
  )
})

const Index = () => (
  <div>{postList}</div>
)

export default Index
