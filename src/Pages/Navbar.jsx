import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSlice.js";
import { selectUserInfo } from "../features/user/userSlice.js";


const Navbar = ({ children }) => {
  const CartProduct = useSelector(selectCartItems);
  const adminOptions = [
    { data: "Admin Page", link: "/admin", admin: true },
    { data: "All Orders", link: "/admin/order", admin: true },
  ];
  const profileDetails = [
    { data: "Profile", link: "/profile" },
    { data: "Orders", link: "/orders" },
  ];
  const user = useSelector(selectUserInfo);


  return (

    <>
      <nav
        className="navbar navbar-expand-lg navbar-light  py-1  sticky-top"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        }}
      >

        <div className="container-lg container-fluid px-3 py-lg-0 py-1 px-4">
          <Link to="/" className=" text-decoration-none d-md-flex d-none">
            <div
              className="navbar-brand fs-5 fw-bold px-1 py-0 m-0"
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
                style={{ fontSize: "19px" }}
              ></i>
              P
            </div>
          </Link>

          <Link to="/" className=" text-decoration-none d-md-none d-flex">
            <div
              className="navbar-brand fs-6 fw-bold px-1 py-0 m-0"
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
                style={{ fontSize: "19px" }}
              ></i>
              P
            </div>
          </Link>



          <div className=" gap-md-3 gap-2 h-100  d-flex mt-lg-1 py-0 ">

            <Link to="/cart" className="text-decoration-none  p-1  cursor">
              <div className="position-relative ">
                <i
                  className="fa-solid fa-cart-shopping text-dark "
                  style={{ fontSize: "19px" }}
                ></i>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "black",
                  }}
                  className="text-center d-lg-flex d-none"
                >
                  Cart
                </div>
                {CartProduct.length > 0 ? (
                  <span
                    className="position-absolute top-0 start-100  translate-middle badge rounded-pill "
                    style={{ backgroundColor: "#0066b2", fontSize: "9px" }}
                  >
                    {CartProduct?.length}
                  </span>
                ) : null}
              </div>
            </Link>

            <div className="btn-group dropstart py-1 mt-lg-0  cursor">
              <div
                className="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="fa-solid fa-user  mx-2"
                  style={{ fontSize: "19px" }}
                ></i>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "black",
                  }}
                  className="d-lg-flex d-none"
                >
                  Profile
                </div>
              </div>
              <ul
                className="dropdown-menu mt-5 p-1 position-absolute "
                style={{
                  backgroundColor: "#2F3940",
                  borderRadius: "7px",
                  zIndex: "1",
                }}
              >
                {adminOptions.map((item) =>
                  item[user?.role] ? (
                    <li className="mb-1 " key={item.admin}>
                      <Link
                        to={item.link}
                        className="drop dropdown-item"
                        aria-current="page"
                        style={{ fontSize: "15px" }}
                      >
                        {item.data}
                      </Link>
                    </li>
                  ) : null
                )}
                <hr className="m-0 " style={{ border: "1px solid white" }} />
                <li className="mb-1 mt-1 p-0">
                  {profileDetails.map((data) => (
                    <Link
                      key={data.link}
                      to={data.link}
                      className="drop dropdown-item"
                      href="#"
                      style={{ fontSize: "15px" }}
                    >
                      {data.data}
                    </Link>
                  ))}
                </li>
                <hr className="m-0 " style={{ border: "1px solid white" }} />
                <li className="mt-1 p-0">
                  {!user ? (
                    <Link
                      to="/login"
                      className="drop dropdown-item rounded-3 cursor"
                      href="#"
                      style={{ fontSize: "15px" }}
                    >
                      Login
                    </Link>
                  ) : (
                    <Link
                      to="/logout"
                      className="drop dropdown-item rounded-3 cursor"
                      href="#"
                      style={{ fontSize: "15px" }}
                    >
                      Sign Out
                    </Link>
                  )}
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
