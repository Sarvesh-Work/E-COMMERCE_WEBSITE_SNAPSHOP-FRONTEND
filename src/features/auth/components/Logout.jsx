import { useEffect } from "react";
import { selectLoggedUser, signOutAsync } from "../authSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteUserInfoAsync, selectUserInfo } from "../../user/userSlice.jsx";
import { signOutCartAsync } from "../../cart/cartSlice.jsx";


function Logout() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedUser);
  const userInfo=useSelector(selectUserInfo)

  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(deleteUserInfoAsync())
    dispatch(signOutCartAsync())

  });


  return <>{!userToken && !userInfo && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
