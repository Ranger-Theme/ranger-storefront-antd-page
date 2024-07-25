import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/"
      className="col-start-2 justify-self-center lg_col-end-3 lg_col-start-1 lg_justify-self-start lg_mr-8 lg_row-start-1"
    >
      <span>Logo</span>
    </Link>
  )
}

export default Logo
