import Link from 'next/link'

const Resolver = () => {
  return (
    <div>
      <p>Resolver Page</p>
      <Link href="/blog/latest-news">Blog</Link>
    </div>
  )
}

export default Resolver
