import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { createUserAsync, selectLoggedUser } from "../AuthSlice";

export function SignUp() {
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/login" replace={true} />}
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="box px-sm-4  py-1">
          <form
            noValidate
            className="mb-1 p-3"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({ email: data.email, password: data.password })
              );
            })}
          >
                <div
              className="navbar-brand fs-4 fw-bold text-center  p-0 mx-auto"
              href="#"
              style={{   color: "#0066b2",letterSpacing:"0.4px",border:"1px solid", width:"143px" }}
            >
              SNAPSH<i className="fa-solid fa-face-grin-wink " style={{fontSize:"21px"}}></i>P
            </div>
            <div className="mb-3 mt-3" style={{ width: "290px" }}>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={{ fontSize: "19px", fontWeight: "400" }}
              >
                Email address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Email not valid ",
                  },
                })}
                className="form-control"
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
                    message: `- at least 8 characters `,
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
                <div className=" text-danger">{errors.password.message}</div>
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
                <p className=" text-danger">{errors.conformPassword.message}</p>
              )}
            </div>

            <button
              id="all-btn"
              className="btn w-100 rounded-3 mt-3"
              type="submit"
            >
              SignUp
            </button>

            <div
              id="emailHelp"
              className="form-text mt-3 text-center"
              style={{ fontSize: "15px" }}
            >
              Already Have a Account?
              <Link
                to="/login"
                className="text-dark mx-1 cursor text-decoration-none"
                style={{ fontWeight: "500" }}
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
