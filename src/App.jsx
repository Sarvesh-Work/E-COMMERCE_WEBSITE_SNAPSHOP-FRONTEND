import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";

import "./global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductsByuserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedUser } from "./features/auth/AuthSlice";
import EmptyCartPage from "./Pages/EmptyCartPage";
import PageNotFound from "./Pages/PageNotFound";
import OrderSuccess from "./Pages/OrderSuccess";
import UserOrderPage from "./Pages/UserOrderPage";
import { fetchLogInUserInfoAsync } from "./features/user/userSlice";
import SignUpPage from "./Pages/SignUpPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import UserProfilePage from "./Pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkOut",
    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
  {
    path: "/productDetails/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/emptyCart",
    element: (
      <Protected>
        <EmptyCartPage />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <UserOrderPage />
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(FetchProductsByuserIdAsync(user?.id));
      dispatch(fetchLogInUserInfoAsync(user?.id));
    }
  }, [dispatch, user]);

  return (
    <div className="Background  h-100">
      <RouterProvider router={router} />
    </div>

    //  ToDo ="Scroll Top karaycha aahe "
  );
}

export default App;
