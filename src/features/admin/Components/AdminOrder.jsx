import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountPrice } from "../../../app/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateOrderAsync,
  fetchAllOrderAsync,
  selectAllOrders,
} from "../../order/OrderSlice";

export default function AdminOrder() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const Orders = useSelector(selectAllOrders);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrderAsync({ pagination }));
  }, [dispatch, page]);

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

  return (
    <div className=" container-lg container-fluid px-2 mt-md-2">
      {Orders == [] ? null : (
        <div className="row p-4 overflow-x-scroll ">
          <h2 className="mb-3"> All Orders </h2>

          <table className="table border-1">
            <thead>
              <tr className="text-center">
                <th scope="col" className="border-1">
                  ORDERS
                </th>
                <th scope="col" className="border-1">
                  ITEMS
                </th>
                <th scope="col" className="border-1">
                  TOTAL AMOUNT
                </th>
                <th scope="col" className="border-1">
                  SHIPPING ADDRESS
                </th>
                <th scope="col" className="border-1">
                  STATUS
                </th>
                <th scope="col" className="border-1">
                  ACTION
                </th>
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
                            src={item.thumbnail}
                            style={{
                              height: "50px",
                              width: "50px",
                              border: "1px solid #cccc",
                            }}
                          />
                        </div>
                        <div className="">
                          {item.title}-Quantity:{item.quantity}-Price:$
                          {discountPrice(item)}
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className=" border-1 text-center">
                    ${order.totalAmount}
                  </td>
                  <td className=" border-1 ">
                    <div>Name: {order.SelectAddress.Name}</div>
                    <div>Email: {order.SelectAddress.Email}</div>
                    <div>Phone: {order.SelectAddress.Phone_number}</div>
                    <div>Address: {order.SelectAddress.Address}</div>
                    <div>City: {order.SelectAddress.City}</div>
                    <div>State: {order.SelectAddress.State}</div>
                    <div>Postal Code: {order.SelectAddress.Postal_Code}</div>
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
        </div>
      )}
    </div>
  );
}
