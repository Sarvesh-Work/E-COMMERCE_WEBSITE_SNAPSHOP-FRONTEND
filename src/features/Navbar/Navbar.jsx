import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectCartItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";

const Navbar = ({ children }) => {
  const CartProduct = useSelector(SelectCartItems);
  const Navigate = [
    { data: "Admin", link: "/admin", admin: true },
    { data: "Order", link: "/admin/order", admin: true },
    { data: "Dashbord", link: "/", user: true },
  ];
  const user = useSelector(selectUserInfo);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light py-0  sticky-top"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div
          className="container-lg container-fluid px-1 "
          style={{ borderBottom: "1px solid #CCCCCC" }}
        >
          <Link to="/" className=" text-decoration-none">
            <div
              className="navbar-brand fs-4 fw-bold px-1 p-0 m-0"
              href="#"
              style={{
                color: "#0066b2",
                letterSpacing: "0.4px",
                border: "1px solid",
              }}
            >
              SNAPSH
              <i
                className="fa-solid fa-face-grin-wink "
                style={{ fontSize: "21px" }}
              ></i>
              P
            </div>
          </Link>

          <div
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-dark"></span>
          </div>

          <div className="navbar-nav mx-lg-auto gap-lg-4 gap-lg-2 p-1 d-lg-flex d-none">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              {Navigate.map((item) =>
                item[user?.role] ? (
                  <li className="nav-item p-0 m-0" key={item.admin}>
                    <Link
                      to={item.link}
                      className="nav-link active p-0 mt-1 "
                      aria-current="page"
                      style={{
                        color: "#0066b2",
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                    >
                      {item.data}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div className="row mx-auto w-25 m-0 d-lg-flex d-none">
            <div className="col-12 p-0  d-flex align-items-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search product you want!"
                style={{
                  border: "1px solid #0066b2",
                  borderRadius: "7px",
                  outline: "none",
                  boxShadow: "none",
                }}
              ></input>
              <i
                className="fas fa-search"
                style={{ fontSize: "20px", color: "#0066b2" }}
              ></i>
            </div>
          </div>
          <div className="navbar-nav  gap-lg-4 h-100 mt-2 d-lg-flex d-none">
            <Link to="/cart">
              <div
                className="nav-link  position-relative mx-1 "
                style={{ width: "30px", marginTop: "2px" }}
              >
                <i className="fa-solid fa-cart-shopping text-dark h-100 w-100 fs-4 "></i>
                {CartProduct.length > 0 ? (
                  <span
                    className="position-absolute top-0 start-100 mt-2 translate-middle badge rounded-pill "
                    style={{ backgroundColor: "#0066b2" }}
                  >
                    {CartProduct?.length}
                  </span>
                ) : null}
              </div>
            </Link>

            <div className="btn-group dropstart p-1 mt-lg-0 mt-2 mb-1 ">
              <div
                className="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503821.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1705190400&semt=ais"
                  alt=""
                  style={{
                    height: "33px",
                    padding: "0px",
                    width: "35px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    border: "1px solid gray",
                  }}
                />
              </div>
              <ul
                className="dropdown-menu mt-5 p-1 position-absolute "
                style={{
                  backgroundColor: "#2F3940",
                  borderRadius: "7px",
                  zIndex: "1",
                }}
              >
                <li className="">
                  <Link
                    to="/profile"
                    className="drop dropdown-item   "
                    href="#"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="drop dropdown-item rounded-3 "
                    href="#"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="drop dropdown-item rounded-3 "
                    href="#"
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default Navbar;

Navbar.propTypes = {
  children: PropTypes.node,
};
