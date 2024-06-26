
import { PropTypes } from "prop-types";


const UserOrder = ({ orders }) => {
  console.log(orders)


  return (
    <>
      {orders && <> {orders.length === 0 ? (
        <>
          <div className="container mt-5">
            <div className="row d-flex justify-content-center ">
              <div className="col-6 mt-4 ">
                <div className="d-flex justify-content-center">
                  <img
                    src="/public/images/empty-box.png"
                    alt=""
                    style={{ height: "240px", width: "240px" }}
                  />
                </div>
                <div
                  className="mt-2 text-center"
                  style={{ fontSize: "18px", fontWeight: "600" }}
                >
                  {"You haven't placed any order yet!"}
                </div>
                <div className="text-center" style={{ fontSize: "15px" }}>
                  Order section is empty. After placing order, You can track
                  them from here!
                </div>
              </div>
            </div>
          </div>

        </>
      ) : (

        <div className=" container-lg  container-fluid mt-2 p-md-3">
          <div className="row d-flex justify-content-center align-items-center">
            <h4 className="col-md-9 col-12">All orders</h4>
          </div>
          {orders &&
            orders?.map((order) => (
              <div
                key={order.user.id}
                className="row p-2  d-flex justify-content-center align-items-center  "
              >
                <div
                  className="col-md-9 col-12 "
                  style={{ border: "1.3px solid #D4D5D9", borderRadius: "5px" }}
                >
                  <div className="d-md-flex">
                    <h4 className="mt-2 mb-2 " style={{fontSize:"20px",fontWeight:"600"}}>Order Id: {order._id}</h4>
                    <h5 className="ms-auto mt-2" style={{ color: "#0066b2",fontSize:"20px",fontWeight:"600" }}>
                      Order Status: Pending
                    </h5>
                  </div>
                  {order?.items.map((items) => (
                    <div
                      className="container-fluid "
                      key={items.product.id}
                      style={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: "5px",
                      }}
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
                            className="d-flex justify-content-between"
                            style={{ fontSize: "15px", fontWeight: "500" }}
                          >
                            <div>{items.product.title}</div>
                            <div>Payment Method: {order.PaymentMethod}</div>
                          </div>
                          <div style={{ color: "gray" }}>
                            AVAILABLE
                          </div>
                          <div className="d-flex gap-1 mt-1 ">
                            <div>Qty:{items.quantity}</div>
                            <div className="ms-auto" style={{fontWeight:"600"}}>
                              Total Price: ${items.product.discountPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="row mb-2  d-flex justify-content-center align-items-center">
                    <div
                      className="col-11  col-11 c mb-2 mt-3"
                      style={{
                        border: "1px solid #D4D5D9",
                        borderRadius: "5px",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <div className="p-1">
                        <div style={{ borderBottom: "1px solid" }} className="mt-1">SHIPPING ADDRESS:</div>
                        <div className=" w-100  mt-1 d-sm-flex justify-content-center align-items-center">
                          <div className="">
                            <div
                              style={{ fontSize: "16px", fontWeight: "500" }}
                            >
                              Name: {order.SelectedAddress?.Name}
                            </div>
                            <div className="fs-6 mb-1">
                              <div>City: {order.SelectedAddress.City}</div>
                              <div>Email: {order.SelectedAddress.Email}</div>
                            </div>
                          </div>
                          <div className="ms-auto  text-md-end ">
                            <div className="text-md-end">
                              Phone: {order.SelectedAddress.Phone_number}
                            </div>
                            <div className="text-md-end">
                              State: {order.SelectedAddress.State}
                            </div>
                            <div className="text-md-end">
                              Postal-code: {order.SelectedAddress.Postal_Code}
                            </div>
                          </div>

                        </div>
                        <div className="mb-1">
                          Address: {order.SelectedAddress.Address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}</>}
    </>
  );
};

export default UserOrder;
UserOrder.propTypes = {
  orders: PropTypes.array,

};