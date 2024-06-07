import Navbar from "./Navbar";
import { Login } from "../features/auth/components/Login";
import Footer from "./Footer";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="h-100 mt-5">
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
