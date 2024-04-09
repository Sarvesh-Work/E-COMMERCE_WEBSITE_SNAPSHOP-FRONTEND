import Navbar from "../features/Navbar/Navbar";
import { Login } from "../features/auth/components/Login";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="h-100 mt-5">
        <Login />
      </div>
    </>
  );
};

export default LoginPage;
