import Navbar from "./Navbar"
import UserOrder from "../features/user/components/UserOrder"
import { getAllOrdersAsync, selectAllOrdersUser, selectUserInfoStatus } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";
import { useEffect } from "react";

const UserOrderPage = () => {
  const orders = useSelector(selectAllOrdersUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  const selectUserStatus = useSelector(selectUserInfoStatus);
  return (
    <>
      <Navbar />
      {selectUserStatus == "loading" ? (
        <Loading />
      ) : (
        <>
          <UserOrder orders={orders} />
        </>)
      }
    </>
  )
}

export default UserOrderPage