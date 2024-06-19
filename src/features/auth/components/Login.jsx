import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { loginUserAsync, selectError, selectLoggedUser } from "../authSlice.jsx";
import { useState } from "react";
import Loading from "../../../Pages/loading";

export function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedUser);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {loading == true ? (
        <Loading />
      ) : (
        <>
          {user && <Navigate to="/" replace={true} />}
          <div className="d-flex justify-content-center align-items-center h-100 py-2">
            <div className="box px-sm-4 px-3 py-2">
              <form
                className=" p-2"
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    loginUserAsync({
                      email: data.email,
                      password: data.password,
                    })
                  );
                })}
              >
                <div
                  className="navbar-brand fs-4 fw-bold text-center  p-0 mx-auto"
                  href="#"
                  style={{
                    color: "#0066b2",
                    letterSpacing: "0.4px",
                    border: "1px solid",
                    width: "143px",
                  }}
                >
                  SNAPSH
                  <i
                    className="fa-solid fa-face-grin-wink "
                    style={{ fontSize: "21px" }}
                  ></i>
                  P
                </div>
                <div className="mb-3 mt-4" style={{ width: "280px" }}>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    style={{ fontSize: "19px", fontWeight: "400" }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    id="exampleInputEmail1"
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      border: "1px solid #C0C0C0",
                    }}
                  />
                  {errors.email && (
                    <p className=" text-danger">{errors.email.message}</p>
                  )}
                </div>
                <div className=" mt-2">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label"
                    style={{ fontSize: "19px", fontWeight: "400" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password required",
                    })}
                    className="form-control"
                    id="exampleInputPassword1"
                    style={{
                      outline: "none",
                      boxShadow: "none",
                      border: "1px solid #C0C0C0",
                    }}
                  />
                  {errors.password && (
                    <div className=" text-danger">
                      {errors.password.message}
                    </div>
                  )}
                  {error && (
                    <div className=" text-danger mt-2">
                      {error.message || error}
                    </div>
                  )}
                </div>
                <Link to="/forgotPassword" className="mb-2">Forgot Password?</Link>

                <button
                  type="submit"
                  className="all-btn btn w-100 rounded-3 mt-3"
                >
                  Login
                </button>

                <div
                  id="emailHelp"
                  className="form-text mt-3 text-center"
                  style={{ fontSize: "15px" }}
                >
                  Not a member?
                  <Link
                    to="/signUp"
                    className="text-dark mx-1 cursor text-decoration-none"
                    style={{ fontWeight: "500" }}
                  >
                    SignUp
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
