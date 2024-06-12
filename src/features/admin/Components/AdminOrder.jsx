import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOrderAsync,
  fetchAllOrderAsync,
  selectAllOrdersAdmin,
  selectTotalOrders,
} from "../../order/orderSlice";
import ProductPagination from "../../Product/Components/ProductPagination";

export default function AdminOrder() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const Orders = useSelector(selectAllOrdersAdmin);
  const totalOrders = useSelector(selectTotalOrders);


  const handelPage = (page) => {
    setPage(page)

  }

  const [EditOrderItemId, setOrderItemId] = useState(-1);

  const handelShow = () => {
    console.log("show");
  };

  const handelEdit = (e, order) => {
    setOrderItemId(order.id);
  };

  const handelUpdate = (e, order) => {
    const newOrder = { ...order, status: e.target.value };
    dispatch(UpdateOrderAsync(newOrder));
    setOrderItemId(-1);
  };

  const adminAllOrderTable = [
    "ORDERS",
    "ITEMS",
    "TOTAL AMOUNT",
    "SHIPPING ADDRESS",
    "STATUS",
    "PAYMENT METHOD",
    "ACTION",
  ];

  const color = (color) => {
    switch (color) {
      case "pending":
        return "purple";

      case "dispatch":
        return "orange";
      case "cancel":
        return "red";
      default:
        return "green";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync(pagination));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalOrders]);

  return (
    <div className=" container-lg container-fluid px-2 mt-md-2">

      {Orders == [] ? null : (
        <div className="row p-4 overflow-x-scroll ">
          <div
            className="col-12 text-center p-0 m-0"
            style={{ fontSize: "40px", lineHeight: "1.2", fontWeight: "700" }}
          >
            <div className="col-12" >Total Orders:{totalOrders} </div>

          </div>

          <h2 className="mb-3"> All Orders </h2>

          <table className="table border-1">
            <thead>
              <tr className="text-center">
                {adminAllOrderTable.map((data, index) => (
                  <th scope="col" className="border-1" key={index}>
                    {data}
                  </th>
                ))}
              </tr>
            </thead>
            {Orders.map((order) => (
              <tbody key={order.id}>
                <tr>
                  <td className=" border-1">{order.id}</td>
                  <td className="m-0 p-1  border-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="p-0 m-0 d-flex gap-2 mt-2 ">
                        <div className="">
                          <img
                            src={item.product.thumbnail}
                            style={{
                              height: "50px",
                              width: "50px",
                              border: "1px solid #cccc",
                            }}
                          />
                        </div>
                        <div className="">
                          {item.product.title}-Quantity:{item.quantity}-Price:$
                          {item.product.discountPrice}-Color:{item.color}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className=" border-1 text-center">
                    ${order.totalAmount}
                  </td>
                  <td className=" border-1 ">
                    <div>Name: {order.SelectedAddress.Name}</div>
                    <div>Email: {order.SelectedAddress.Email}</div>
                    <div>Phone: {order.SelectedAddress.Phone_number}</div>
                    <div>Address: {order.SelectedAddress.Address}</div>
                    <div>City: {order.SelectedAddress.City}</div>
                    <div>State: {order.SelectedAddress.State}</div>
                    <div>Postal Code: {order.SelectedAddress.Postal_Code}</div>
                  </td>

                  <td
                    className=" border-1 text-center "
                    style={{ color: `${color(order.status)}` }}
                  >
                    {EditOrderItemId == order.id ? (
                      <select onChange={(e) => handelUpdate(e, order)}>
                        <option value="pending">pending</option>
                        <option value="dispatch">dispatch</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancel">cancel</option>
                      </select>
                    ) : (
                      <div>{order.status.toUpperCase()}</div>
                    )}
                  </td>
                  <td className=" border-1 text-center ">
                    {order.PaymentMethod}
                  </td>
                  <td className=" border-1 ">
                    <div className="gap-2 d-flex justify-content-center">
                      <div className=" cursor">
                        <i
                          className="fa-regular fa-eye"
                          onClick={(e) => handelShow(e, order)}
                        ></i>
                      </div>
                      <div className=" cursor">
                        <i
                          className="fa-solid fa-pencil"
                          onClick={(e) => handelEdit(e, order)}
                        ></i>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <ProductPagination
            page={page}
            setPage={setPage}
            handlPage={handelPage}
            totalItems={totalOrders}

          />
        </div>
      )}
    </div>
  );
}
