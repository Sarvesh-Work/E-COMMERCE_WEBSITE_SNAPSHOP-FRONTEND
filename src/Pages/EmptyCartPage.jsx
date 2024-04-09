import { Link } from "react-router-dom"
import Navbar from "../features/Navbar/Navbar"



const EmptyCartPage = () => {
  return (
    <>
        <Navbar/>
        <div className="container p-3">
          <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-8 col-md-5 col-lg-3 mt-5 pt-5">
               <img src="/public/images/shopping-3225130_1280.webp" alt="" className="w-100 h-100" style={{color:"#0066b2"}}/>
            </div>
            <div className="col-11 mt-5 text-center" >
              <p className="m-1"
               style={{color:"#424553",fontSize:"24px",fontWeight:"600"}}
              >Hey, the cart is empty! </p>
              <div style={{color:"#8F818C",fontSize:"17px"}}>{"There is noting in your cart let's add items"}</div>
             
            </div>
            <Link to="/" className="mt-4 col-3 text-center p-1 text-decoration-none" id="all-btn" style={{fontSize:"18px"}}>
                ADD NOW
              </Link>
            
          </div>
        </div>
    </>
  )
}

export default EmptyCartPage