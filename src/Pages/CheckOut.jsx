import { Link, Navigate } from "react-router-dom";
import FormCheckOut from "./FormCheckOut";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteItemFromCartAsync,
  SelectCartItems,
  UpdateItemAsync,
} from "../features/cart/cartSlice";
import { useState } from "react";
import {
  orderItemsAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import Navbar from "../features/Navbar/Navbar";

const CheckOut = () => {
  const items = useSelector(SelectCartItems);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [SelectAddress, setSelectAddress] = useState(null);
  const [PaymentMethod, selectPaymentMethod] = useState("Cash");
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handelCart = (e, items) => {
    dispatch(UpdateItemAsync({ ...items, quantity: +e.target.value }));
  };

  const DeleteItem = (id) => {
    dispatch(DeleteItemFromCartAsync(id));
  };

  const handelAddress = (e) => {
    setSelectAddress(user.address[e.target.value]);
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
      user,
      selectPaymentMethod,
      SelectAddress,
      status: "pending",
    };
    dispatch(orderItemsAsync(order));
  };

  return (
    <>
    <Navbar/>
      {items.length <= 0 && <Navigate to="/EmptyCart" replace={true} />}
      {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} />}
      <div className="container-lg container-fluid mt-4 p-lg-0 ">
        <div className="row  d-flex justify-content-center p-1 px-3 ">
          <div className="col-lg-7 p-md-0 p-2">
            <FormCheckOut
              PaymentMethod={PaymentMethod}
              handelAddress={handelAddress}
              handelPaymentMethod={handelPaymentMethod}
            />
          </div>
          <div className="col-lg-4 mt-lg-0 mt-3   ">
            <div
              className="row box  ms-lg-auto sticky-lg-top"
              style={{top:"100px"}}
            >
              <div className="p-2 col-12 ">
                <div
                  className="fs-3"
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    borderBottom: "1px solid #CED3D8",
                  }}
                >
                  Cart
                </div>
                <div className="col-12 p-1">
                  {items.map((product) => (
                    <div key={product.id} className=" container-fluid">
                      <div
                        style={{ borderBottom: "1px solid #CED3D8" }}
                        className="row gap-1 p-1"
                      >
                        <div
                          className="  mb-3 col-3 p-0 mt-lg-2 mt-1"
                          style={{
                            border: "1px solid #CED3D8",
                            borderRadius: "8px",
                            overflow: "hidden",
                            height: "60px",
                            width: "60px",
                          }}
                        >
                          <img
                            src={product.thumbnail}
                            alt=""
                            className="w-100 h-100"
                          />
                        </div>
                        <div className="p-1 mb-1 col-lg-6 col-5">
                          <div
                            className=""
                            style={{ fontSize: "20px", fontWeight: "500" }}
                          >
                            {product.title}
                          </div>
                          <div style={{ color: "gray" }}>
                            Rating: {product.rating}
                          </div>
                          <div className="d-flex gap-1 mt-1">
                            <div>Qty</div>
                            <select
                              name="Quntity"
                              id=""
                              className="bg-dark text-white rounded-2"
                              onChange={(e) => handelCart(e, product)}
                              value={product.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                        <div className="ms-auto col-lg-3 col-3  text-lg-end p-0 d-flex flex-column justify-content-between mt-1">
                          <div className="ms-auto">$ {product.price}</div>
                          <div
                            className="cursor fw-bold  ms-auto mb-2 px-2"
                            onClick={() => DeleteItem(product.id)}
                            style={{color:"#0066b2",border:"1px solid #0066b2",borderRadius:"5px"}}
                          >
                            Remove
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="row  px-3 py-2 d-flex justify-content-between">
                  <div className="col-lg-5 col-8">
                    <div style={{ fontWeight: "500" }}>Subtotal</div>
                    <div style={{ fontWeight: "500" }}>Total items in cart</div>
                  </div>
                  <div className="col-lg-5 col-4 ">
                    <div className=" text-end ms-auto">$ {totalAmount}</div>
                    <div className="text-end ms-auto">{totalItems} Items</div>
                  </div>

                  <div onClick={handelOrder}>
                    <div id="all-btn" className="btn w-100 rounded-3 mt-4">
                      Order Now
                    </div>
                  </div>
                  <div style={{ color: "gray" }} className="text-center mt-3">
                    or
                    <Link to="/" style={{ textDecoration: "none" }}>
                      <span
                        className="text-dark mx-1"
                        style={{ fontWeight: "500" }}
                      >
                        Continue Shopping
                        <i className="fa-solid fa-arrow-right "></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
