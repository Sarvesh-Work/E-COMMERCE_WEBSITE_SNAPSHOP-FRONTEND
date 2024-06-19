import Home from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import CheckOut from "./Pages/CheckOut";
import "./global.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchCartProductsAsync } from "./features/cart/cartSlice.jsx";
import {
  checkAuthAsync,
  selectCheckedUser,
  selectLoggedUser,
} from "./features/auth/authSlice.js";
import EmptyCartPage from "./Pages/EmptyCartPage";
import PageNotFound from "./Pages/PageNotFound";
import OrderSuccess from "./Pages/OrderSuccess";
import UserOrderPage from "./Pages/UserOrderPage";
import { fetchLogInUserInfoAsync } from "./features/user/userSlice.js";
import ProductDetailPage from "./Pages/ProductDetailPage";
import UserProfilePage from "./Pages/UserProfilePage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./Pages/AdminHome";
import AdminProductDetailPage from "./Pages/AdminProductDetailPage copy";
import AdminProductForm from "./Pages/AdminProductForm";
import AdminOrderPage from "./Pages/AdminOrderpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from "./Pages/SignupPage";
import StripCheckoutPage from "./Pages/StripeCheckoutPage";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPassword from "./features/auth/components/ResetPassword";





const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productDetails/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin/productForm",
    element: (
      <ProtectedAdmin>
        <AdminProductForm />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm",
    element: (
      <ProtectedAdmin>
        <AdminProductForm />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productForm/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductForm />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/order",
    element: (
      <ProtectedAdmin>
        <AdminOrderPage />
      </ProtectedAdmin>
    ),
  },
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
    path: "/",
    element: <PageNotFound />,
  },
  {
    path: "/logout",
    element: <Logout />,
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
    path: "/stripe-cardCheckout",
    element: (
      <Protected>
        <StripCheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const user = useSelector(selectLoggedUser);
  const checkUser = useSelector(selectCheckedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(FetchCartProductsAsync());
      dispatch(fetchLogInUserInfoAsync());
    }
  }, [dispatch, user]);



  return (
    <div className="Background  h-100">
      {checkUser && (
        <>

          <RouterProvider router={router} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition:Bounce
            theme="light"
          />
        </>
      )}
    </div>

    //  ToDo ="Scroll Top karaycha aahe "
  );
}

export default App;
