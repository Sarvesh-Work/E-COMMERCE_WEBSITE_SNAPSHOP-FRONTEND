import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { ResetCartAsync } from "../features/cart/cartSlice.jsx";
import { resetCurrentOrder } from "../features/order/orderSlice.jsx";

import Navbar from "./Navbar";
import Loading from "./loading";


const OrderSuccess = () => {
  const Params = useParams();
  const dispatch = useDispatch()
  const [loading,setLoading]=useState(true)

  useEffect(() => {
    dispatch(ResetCartAsync())
    dispatch(resetCurrentOrder())

    setTimeout(() => {
       setLoading(false)
    }, 2000);
  })

  return (
    <>
      <Navbar />
      {!Params.id && <Navigate to="/" replace={true} />}
      {
      loading?(
      <Loading/>
      ):(
      <div className=" container h-100 d-flex justify-content-center align-items-center">
        <div className="row mb-3">
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
      </div>)
      }

    </>
  );
};

export default OrderSuccess;
