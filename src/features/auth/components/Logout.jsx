import { useEffect } from "react";
import { selectLoggedUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteUserInfoAsync, selectUserInfo } from "../../user/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedUser);
  const userInfo=useSelector(selectUserInfo)

  useEffect(() => {
    dispatch(signOutAsync());
    dispatch(deleteUserInfoAsync())
  });


  return <>{!userToken && !userInfo && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
