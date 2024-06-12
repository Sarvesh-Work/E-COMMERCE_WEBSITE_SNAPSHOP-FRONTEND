import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { selectCartItems, selectCheckCart, UpdateItemAsync } from "./cartSlice";
import Loading from "../../Pages/loading";
import ConformDelete from "../../Pages/ConformDelete";
import { useState } from "react";

export function Cart() {
  const items = useSelector(selectCartItems);

  const CheckCart = useSelector(selectCheckCart);
  const dispatch = useDispatch();
  const [Id, setId] = useState("");
  const [loading, setLoading] = useState(true);

  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handelQuantity = (e, items) => {
    dispatch(UpdateItemAsync({ id: items.id, quantity: +e.target.value }));
  };



  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {/* Todo: adding customize page for cart  */}
      {loading == true ? (
        <Loading />
      ) : (
        <>
          {items.length <= 0 && CheckCart && (
            <Navigate to="/EmptyCart" replace={true} />
          )}

          <div className="row box p-3 mx-lg-5  h-100 mt-3">
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
                      <div className=" px-2 mb-1 col-lg-7 col-5 d-flex flex-column justify-content-center ">
                        <div
                          className=""
                          style={{ fontSize: "20px", fontWeight: "500" }}
                        >
                          {item.product.title}
                        </div>
                        <div className="p-0" style={{ color: "gray" }}>
                          AVAILABLE
                        </div>
                        <div className="d-flex">
                          <div className="d-flex">
                            <div className="">Qty</div>
                            <select
                              name="Quantity"
                              id=""
                              className="bg-dark text-white rounded-2 mx-1"
                              onChange={(e) => {
                                handelQuantity(e, item)
                              }}
                              value={item.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>

                        </div>

                      </div>
                      <div className="ms-auto col-lg-1 col-3 text-end p-0 d-flex flex-column justify-content-between mt-1">
                        <div className="ms-auto fw-bold">
                          $ {item.product.discountPrice}
                        </div>

                        <div
                          className="px-2 cursor fw-bold  ms-auto mb-2"
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop${item.product.id}`}
                          onClick={() => setId(item.product.id)}
                          style={{
                            color: "#CF352E",
                            border: "1px solid #CF352E",
                            borderRadius: "5px",
                            fontSize: "17px"
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
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

              <div className="row  px-3 py-2 d-flex justify-content-between">
                <div className="col-lg-5 col-md-8 col-7 ">
                  <div style={{ fontWeight: "500" }}>Subtotal</div>
                  <div style={{ fontWeight: "500" }}>Total items in cart</div>
                </div>
                <div className="col-lg-5 col-4 " style={{ fontWeight: "600" }}>
                  <div className=" text-end ms-auto">$ {totalAmount}</div>
                  <div className="text-end ms-auto">{totalItems} Items</div>
                </div>
                <Link to="/checkOut" className="text-decoration-none">
                  <div className="all-btn text-center p-1 w-100  mt-4">
                    Checkout
                  </div>
                </Link>
                <div
                  style={{ color: "gray" }}
                  className=" mt-2 d-flex justify-content-center align-items-center"
                >
                  or
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <div
                      className="text-dark mx-1 text-center"
                      style={{ fontWeight: "500" }}
                    >
                      Continue Shopping
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
