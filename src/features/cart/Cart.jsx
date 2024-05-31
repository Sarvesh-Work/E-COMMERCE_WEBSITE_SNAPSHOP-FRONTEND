import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  SelectCartItems,
  SelectCartStatus,
  UpdateItemAsync,
} from "./cartSlice";
import { discountPrice } from "../../app/constant";
import Loading from "../../Pages/loading";
import ConformDelete from "../../Pages/ConformDelete";
import { useState } from "react";

export function Cart() {
  const items = useSelector(SelectCartItems);
  console.log(items)
  const dispatch = useDispatch();
  const cartStatus = useSelector(SelectCartStatus);
  const [Id, setId] = useState("");

  const totalAmount = items.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handelCart = (e, items) => {
    dispatch(UpdateItemAsync({ id: items.id, quantity: +e.target.value }));
  };

  return (
    <>
      {/* Todo: adding customize page for cart  */}

      {items.length <= 0 && <Navigate to="/EmptyCart" replace={true} />}

      <div className="row box p-3 mx-lg-5  h-100 mt-4">
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
          {cartStatus == "loading" ? (
            <Loading />
          ) : (
            <div className="col-12 p-1">
              {items.map((item) => (
                <div key={item.product.id} className=" container-fluid">
                  <div
                    key={item.product.id}
                    style={{ borderBottom: "1px solid #CED3D8" }}
                    className="row gap-1 p-1"
                  >
                    <div
                      className="  mb-3 col-3 p-0 mt-lg-2 mt-4"
                      style={{
                        border: "1px solid #CED3D8",
                        borderRadius: "8px",
                        overflow: "hidden",
                        height: "80px",
                        width: "80px",
                      }}
                    >
                      <img
                        src={item.product.thumbnail}
                        alt=""
                        className="w-100 h-100"
                      />
                    </div>
                    <div className="p-1 px-2 mb-1 col-lg-7 col-5 d-flex flex-column justify-content-center ">
                      <div
                        className=""
                        style={{ fontSize: "20px", fontWeight: "500" }}
                      >
                        {item.product.title}
                      </div>
                      <div style={{ color: "gray" }}>
                        Rating: {item.product.rating}
                      </div>
                      <div className="d-flex gap-1 mt-1 ">
                        <div>Qty</div>
                        <select
                          name="Quantity"
                          id=""
                          className="bg-dark text-white rounded-2"
                          onChange={(e) => handelCart(e, item)}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                    <div className="ms-auto col-lg-1 col-3 text-end p-0 d-flex flex-column justify-content-between mt-1">
                      <div className="ms-auto">
                        $ {discountPrice(item.product)}
                      </div>
                      {/* <div
                        className="px-2 cursor fw-bold  ms-auto mb-2"
                        onClick={() => DeleteItem(item.product.id)}
                        style={{
                          color: "#0066b2",
                          border: "1px solid #0066b2",
                          borderRadius: "5px",
                        }}
                      >
                        Remove
                      </div> */}
                      <div
                        className="px-2 cursor fw-bold  ms-auto mb-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#staticBackdrop${item.product.id}`}
                        onClick={() => setId(item.product.id)}
                        style={{
                          color: "#0066b2",
                          border: "1px solid #0066b2",
                          borderRadius: "5px",
                        }}
                      >
                        Remove
                      </div>

                      <div
                        className="modal fade"
                        id={`staticBackdrop${item.product.id}`}
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          {item.product.id == Id && (
                            <ConformDelete
                              product={item.product}
                              id={item.id}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="row  px-3 py-2 d-flex justify-content-between">
            <div className="col-lg-5 col-md-8 col-7 ">
              <div style={{ fontWeight: "500" }}>Subtotal</div>
              <div style={{ fontWeight: "500" }}>Total items in cart</div>
            </div>
            <div className="col-lg-5 col-4 ">
              <div className=" text-end ms-auto">$ {totalAmount}</div>
              <div className="text-end ms-auto">{totalItems} Items</div>
            </div>
            <Link to="/checkOut">
              <div id="all-btn" className="btn w-100 rounded-3 mt-4">
                Checkout
              </div>
            </Link>
            <div style={{ color: "gray" }} className="text-center mt-3">
              or
              <Link to="/" style={{ textDecoration: "none" }}>
                <span className="text-dark mx-1" style={{ fontWeight: "500" }}>
                  Continue Shopping
                  <i className="fa-solid fa-arrow-right "></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
