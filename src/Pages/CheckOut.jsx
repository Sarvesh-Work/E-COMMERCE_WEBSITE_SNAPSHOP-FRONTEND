import { Link, Navigate } from "react-router-dom";
import FormCheckOut from "./FormCheckOut";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectCartItems, UpdateItemAsync } from "../features/cart/cartSlice";
import {
  orderItemsAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CheckOut = () => {
  const items = useSelector(selectCartItems);
  console.log({ items });
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [SelectedAddress, setSelectedAddress] = useState(null);
  const [PaymentMethod, selectPaymentMethod] = useState("Cash");
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handelCart = (e, items) => {
    dispatch(UpdateItemAsync({ id: items.id, quantity: +e.target.value }));
  };

  const handelAddress = (e) => {
    setSelectedAddress(user.address[e.target.value]);
    console.log(user.address[e.target.value]);
  };

  const handelPaymentMethod = (e) => {
    selectPaymentMethod(e.target.value);
    console.log(e.target.value);
  };

  const handelOrder = () => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user: user.id,
      PaymentMethod,
      SelectedAddress,
      status: "pending",
    };
    dispatch(orderItemsAsync(order));
  };

  return (
    <>
      <Navbar />

      {currentOrder && currentOrder.PaymentMethod == "Cash" && (
        <Navigate to={`/order-success/${currentOrder.id}`} />
      )}
      {currentOrder && currentOrder.PaymentMethod == "Card" && (
        <Navigate to={`/stripe-cardCheckout`} />
      )}
      {user && (
        <div className="container-lg container-fluid mt-4 p-lg-0  ">
          <div className="row  d-flex justify-content-center p-lg-1 px-lg-0 px-4 gap-2">
            <div className="col-lg-6 p-md-0 p-2 ">
              <FormCheckOut
                PaymentMethod={PaymentMethod}
                handelAddress={handelAddress}
                handelPaymentMethod={handelPaymentMethod}
              />
            </div>
            <div className="col-lg-5 mt-lg-0 mt-3 z-0 mb-4">
              <div
                className="row box  ms-lg-auto sticky-lg-top"
                style={{ top: "90px" }}
              >
                <div className="p-2 col-12 ">
                  <div
                    className="fs-3"
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      borderBottom: "1px solid #CED3D8",
                    }}
                  >
                    Cart
                  </div>
                  <div className="col-12 p-1 ">
                    {items.map((item) => (
                      <div key={item.product.id} className=" container-fluid">
                        <div
                          style={{ borderBottom: "1px solid #CED3D8" }}
                          className="row gap-1 p-1"
                        >
                          <div
                            className="  col-3 p-0 mt-lg-2"
                            style={{
                              border: "1px solid #CED3D8",
                              borderRadius: "8px",
                              overflow: "hidden",
                              height: "60px",
                              width: "60px",
                            }}
                          >
                            <img
                              src={item.product.thumbnail}
                              alt=""
                              className="w-100 h-100 "
                            />
                          </div>
                          <div className="p-1 mb-1 col-lg-6 col-5">
                            <div
                              className=""
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              {item.product.title}
                            </div>
                            <div style={{ color: "gray", fontSize: "15px" }} >
                              Rating: {item.product.rating}
                            </div>

                            <div className="d-flex gap-1 ">
                              <div style={{ fontSize: "16px" }}>Qty :</div>
                              <select
                                name="Quantity"
                                id=""
                                className="text-black rounded-2 mt-1"
                                onChange={(e) => handelCart(e, item)}
                                value={item.quantity}
                                style={{
                                  fontSize: "13px",
                                  height: "20px",
                                  width: "30px",
                                  backgroundColor: "#E5E4E2",
                                  border: "none",
                                }}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="2">3</option>
                              </select>
                            </div>
                          </div>
                          <div className="ms-auto col-lg-3 col-3  text-lg-end p-0 d-flex flex-column justify-content-between mt-1">
                            <div className="ms-auto fw-bold">
                              $ {item.product.discountPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="row  px-3 py-2 d-flex justify-content-between">
                    <div className="col-lg-5 col-8">
                      <div style={{ fontWeight: "500" }}>Subtotal</div>
                      <div style={{ fontWeight: "500" }}>Total items</div>
                    </div>
                    <div className="col-lg-5 col-4 ">
                      <div className=" text-end ms-auto fw-bold">
                        $ {totalAmount}
                      </div>
                      <div className="text-end ms-auto fw-bold">
                        {totalItems} Items
                      </div>
                    </div>

                    <div onClick={handelOrder}>
                      <div  className="all-btn btn w-100 rounded-3 mt-4">
                        Order Now
                      </div>
                    </div>
                    <div style={{ color: "gray" }} className="text-center mt-2">
                      or
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <span
                          className="text-dark mx-1"
                          style={{ fontWeight: "500" }}
                        >
                          Continue Shopping
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CheckOut;
