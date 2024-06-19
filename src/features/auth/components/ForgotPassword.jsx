import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordRequestAsync,
  selectLoggedUser,
  selectMailSent,
} from "../authSlice.jsx";
import { Navigate } from "react-router-dom";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector(selectLoggedUser);
  const dispatch = useDispatch();
  const mailSent = useSelector(selectMailSent);

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="d-flex justify-content-center align-items-center h-100 py-2">
        <div className="box px-sm-4 px-3 py-2">
          <form
            className=" p-2"
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(resetPasswordRequestAsync(data.email));
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
              {mailSent && <p className=" text-success">Mail Sent</p>}
            </div>

            <button type="submit" className="all-btn btn w-100 rounded-3 mt-3">
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
