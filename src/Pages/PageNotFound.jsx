import { Link } from "react-router-dom";
import Navbar from "../features/Navbar/Navbar";

const PageNotFound = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row pt-5 text-center d-flex justify-content-center align-items-center">
          <div className="col-12 p-2 ">
            <i
              className="fa-solid fa-face-rolling-eyes"
              style={{ fontSize: "150px" }}
            ></i>
            <div style={{ fontSize: "45px", fontWeight: "600" }}>404</div>
            <p className="" style={{ fontSize: "30px", fontWeight: "600" }}>
              Sorry! the page you are locking for is not found{" "}
            </p>
            <Link to="/" className=" text-decoration-none">
              <div
                id="all-btn"
                className="w-25 mx-auto cursor mt-3"
                style={{
                  fontSize: "25px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                SH
                <i
                  className="fa-solid fa-face-grin-wide "
                  style={{ fontSize: "22px" }}
                ></i>
                P MORE
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
