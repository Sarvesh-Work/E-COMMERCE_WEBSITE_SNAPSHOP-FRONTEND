import Navbar from "./Navbar";
import ForgetPassword from "../features/auth/components/ForgotPassword";
import Footer from "./Footer";

const ForgotPasswordPage = () => {
  return (
    <>
      <Navbar />
      <div className="h-100 mt-5">
        <ForgetPassword />
      </div>
      <Footer/>
    </>
  );
};

export default ForgotPasswordPage;
