import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container p-3">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-8 col-md-5 col-lg-3  pt-5">
            <img
              src="/public/images/error.png"
              alt=""
              className="w-100 h-100"
            />
          </div>
          <div className="col-11 mt-2 text-center">
            <p
              className="m-1"
              style={{ color: "#424553", fontSize: "18px", fontWeight: "600" }}
            >
              Sorry! the page you are locking for is not found
            </p>
          </div>
          <Link
            to="/"
            className="mt-4 col-lg-2 col-3 text-center p-1 text-decoration-none"
            id="all-btn"
            style={{ fontSize: "20px", letterSpacing: "0.3px" }}
          >
            SH
            <i
              className="fa-solid fa-face-grin-wide "
              style={{ fontSize: "17px" }}
            ></i>
            P MORE
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;

