import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  DeleteItemFromCartAsync,
  SelectCartItems,
  UpdateItemAsync,
} from "./cartSlice";
import { discountPrice } from "../../app/constant";

export function Cart() {
  const items = useSelector(SelectCartItems);
  const dispatch = useDispatch();

  const totalAmount = items.reduce(
    (amount, item) => discountPrice(item) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handelCart = (e, items) => {
    dispatch(UpdateItemAsync({ ...items, quantity: +e.target.value }));
  };

  const DeleteItem = (id) => {
    dispatch(DeleteItemFromCartAsync(id));
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
          <div className="col-12 p-1">
            {items.map((product) => (
              <div key={product.id} className=" container-fluid">
                <div
                  key={product.id}
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
                      src={product.thumbnail}
                      alt=""
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="p-1 px-2 mb-1 col-lg-7 col-5 d-flex flex-column justify-content-center ">
                    <div
                      className=""
                      style={{ fontSize: "20px", fontWeight: "500" }}
                    >
                      {product.title}
                    </div>
                    <div style={{ color: "gray" }}>
                      Rating: {product.rating}
                    </div>
                    <div className="d-flex gap-1 mt-1 ">
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
                  <div className="ms-auto col-lg-1 col-3 text-end p-0 d-flex flex-column justify-content-between mt-1">
                    <div className="ms-auto">$ {discountPrice(product)}</div>
                    <div
                      className="px-2 cursor fw-bold  ms-auto mb-2"
                      onClick={() => DeleteItem(product.id)}
                      style={{
                        color: "#0066b2",
                        border: "1px solid #0066b2",
                        borderRadius: "5px",
                      }}
                    >
                      Remove
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
                  Continue Shopping <i className="fa-solid fa-arrow-right "></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
