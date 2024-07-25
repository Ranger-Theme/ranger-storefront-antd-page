import Link from 'next/link'

const Cart = () => {
  return (
    <div>
      <span>Checkout Page</span>
      <br />
      <Link href="/checkout/cart">Cart Page</Link>
    </div>
  )
}

export default Cart
