import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { resetPasswordAsync, selectPasswordReset } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "../../../Pages/PageNotFound";

const ResetPassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const user = useSelector(selectLoggedUser);
  const passwordReset = useSelector(selectPasswordReset);
  const dispatch = useDispatch();

  return (
    <>
      {email && token ? (
        <div className="d-flex justify-content-center align-items-center h-100 py-2 mt-5">
          <div className="box px-sm-4 px-3 py-2">
            <form
              className=" p-2"
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
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
              <div className="mb-3 mt-2">
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
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    },
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
                    - at least 8 characters <br />
                    - must contain at least 1 uppercase letter <br /> - 1
                    lowercase letter and 1 number <br />- Can contain special
                    characters
                  </div>
                )}
              </div>

              <div className="mb-3 mt-2">
                <label
                  htmlFor="exampleInputConformPassword1"
                  className="form-label"
                  style={{ fontSize: "19px", fontWeight: "400" }}
                >
                  Conform Password
                </label>
                <input
                  type="password"
                  {...register("conformPassword", {
                    required: "Conform-Password is required",
                    validate: (value, formValue) =>
                      value === formValue.password || "Password not matching",
                  })}
                  className="form-control"
                  id="exampleInputConformPassword1"
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "1px solid #C0C0C0",
                  }}
                />
                {errors.conformPassword && (
                  <p className=" text-danger">
                    {errors.conformPassword.message}
                  </p>
                )}
                {passwordReset && (
                  <p className=" text-success">Password Reset Successfully</p>
                )}
              </div>

              <div
                id="emailHelp"
                className="form-text mt-3 text-center"
                style={{ fontSize: "15px" }}
              >
                Go back to
                <Link
                  to="/login"
                  className="text-dark mx-1 cursor text-decoration-none"
                  style={{ fontWeight: "500" }}
                >
                  Login
                </Link>
              </div>

              <button
                type="submit"
                className="all-btn btn w-100 rounded-3 mt-3"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default ResetPassword;
