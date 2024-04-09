import Navbar from "../features/Navbar/Navbar"
import { Cart } from "../features/cart/Cart"


const CartPage = () => {
  return (
    <>
      <Navbar/>
    <div className="container px-lg-4 px-4 py-lg-3 py-3" >
     
      <Cart></Cart>
    </div>
    </>
  )
}

export default CartPage