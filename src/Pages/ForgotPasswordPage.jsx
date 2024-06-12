import Navbar from "./Navbar";
import ForgetPassword from "../features/auth/components/ForgotPassword";


const ForgotPasswordPage = () => {
  return (
    <>
      <Navbar />
      <div className="h-100 mt-5">
        <ForgetPassword />
      </div>
     
    </>
  );
};

export default ForgotPasswordPage;
