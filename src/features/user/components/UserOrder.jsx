import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAsync, selectAllOrders } from "../userSlice";
import { useEffect } from "react";
import { discountPrice } from "../../../app/constant";

const UserOrder = () => {
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersAsync());
  });
  return (
    <>
      <div className=" container-lg  container-fluid mt-2 p-md-3">
        <div className="row d-flex justify-content-center align-items-center">
          <h4 className="col-md-9 col-12">All orders</h4>
        </div>
        {orders?.map((order) => (
          <div
            key={order.user.id}
            className="row p-2  d-flex justify-content-center align-items-center  "
          >
            <div
              className="col-md-9 col-12 "
              style={{ border: "1.3px solid #D4D5D9", borderRadius: "5px" }}
            >
              <div className="d-md-flex">
                <h4 className="mt-2 mb-2 ">Order Id: {order.id}</h4>
                <h5 className="ms-auto mt-2" style={{ color: "#0066b2" }}>
                  Order Status: Pending
                </h5>
              </div>
              {order?.items.map((items) => (
                <div
                  className="container-fluid "
                  key={items.product.id}
                  style={{ backgroundColor: "#f5f5f5", borderRadius: "5px" }}
                >
                  <div className="row mt-2 mb-2 p-1 d-flex justify-content-center align-items-center ">
                    <div
                      className="col-3 p-0 mt-lg-2"
                      style={{
                        border: "1px solid #f5f5f5",
                        borderRadius: "8px",
                        overflow: "hidden",
                        height: "80px",
                        width: "80px",
                      }}
                    >
                      <img
                        src={items.product.thumbnail}
                        alt=""
                        className="w-100 h-100"
                      />
                    </div>
                    <div className="p-1 px-2 mb-1 col-md-10 col-sm-9 col-8 d-flex flex-column justify-content-center ">
                      <div
                        className=""
                        style={{ fontSize: "20px", fontWeight: "500" }}
                      >
                        {items.product.title}
                      </div>
                      <div style={{ color: "gray" }}>
                        Rating: {items.product.rating}
                      </div>
                      <div className="d-flex gap-1 mt-1 ">
                        <div>Qty:{items.quantity}</div>
                        <div className="ms-auto">
                          Price: ${discountPrice(items.product)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row mb-2  d-flex justify-content-center align-items-center">
                <div
                  className="col-lg-11 col-md-12 col-11 c mb-2 mt-3"
                  style={{
                    border: "1px solid #D4D5D9",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <>
                    <div>SHIPPING ADDRESS:</div>
                    <div className=" w-100  d-sm-flex justify-content-center align-items-center">
                      <div className="">
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          {order.SelectedAddress?.Name}
                        </div>
                        <div className="fs-6 mb-1">
                          <div>City: {order.SelectedAddress.City}</div>
                          <div>Email: {order.SelectedAddress.Email}</div>
                        </div>
                      </div>
                      <div className="ms-auto px-sm-3 text-md-end ">
                        Phone: {order.SelectedAddress.Phone_number}
                        <div className="text-md-end">
                          State: {order.SelectedAddress.State}
                        </div>
                        <div className="text-md-end">
                          {" "}
                          Postal-code: {order.SelectedAddress.Postal_Code}
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserOrder;
