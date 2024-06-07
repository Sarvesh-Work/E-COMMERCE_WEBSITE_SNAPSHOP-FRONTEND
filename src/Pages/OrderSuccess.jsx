import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { ResetCartAsync } from "../features/cart/cartSlice";
import { resetCurrentOrder } from "../features/order/orderSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";


const OrderSuccess = () => {
  const Params = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ResetCartAsync())
    dispatch(resetCurrentOrder())
  })

  return (
    <>
      <Navbar />
      {!Params.id && <Navigate to="/" replace={true} />}
      <div className=" container h-100 d-flex justify-content-center align-items-center">
        <div className="row ">
          <div className="col-12 text-center">
            <i
              className="bi bi-patch-check-fill"
              style={{ fontSize: "150px", color: "#0066b2" }}
            ></i>
            <p style={{ fontSize: "30px" }}>Order Conformed</p>
            <p>Order Number #{Params.id} </p>
            <div>
              YOUR ORDER SUCCESSFULLY PLACED{" "}
              <Link
                to="/"
                style={{ fontWeight: "600", textDecoration: "underline" }}
                className="mx-2 cursor"
              >
                SHOPE MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
