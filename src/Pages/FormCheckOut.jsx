import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { PropTypes } from "prop-types";
import // UpdateAddressAsync,
"../features/auth/authSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";

const FormCheckOut = ({
  handelAddress,
  handelPaymentMethod,
  PaymentMethod,
}) => {
  const user = useSelector(selectUserInfo);


  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  return (
    <div
      className="row box p-2 mx-lg-2 mb-3 "
      style={{ border: "1px solid #cccc", borderRadius: "5px" }}
    >
      <div
        className="col-12 mb-0 p-2"
        style={{ borderBottom: "1px solid #cccc" }}
      >
        <h3 className="col m-0">Personal Information</h3>
        <span>Use a permanent address </span>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          dispatch(
            updateUserAsync({ ...user, address: [...user.address, data] })
          );
          reset();
        })}
        className="mt-2"
      >
        <div style={{ borderBottom: "1px solid  #B6B6B4" }}>
          <div className="mb-3 d-flex gap-4">
            <div className="w-75">
              <label htmlFor="firstName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control shadow-none"
                id="firstName"
                style={{ border: "1px solid #C0C0C0" }}
                aria-describedby="emailHelp"
                {...register("Name", { required: "Full Name is required" })}
              />
            </div>
          </div>
          <div className="mb-3 w-75">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control shadow-none "
              id="email"
              style={{ border: "1px solid #C0C0C0" }}
              aria-describedby="emailHelp"
              {...register("Email", { required: "Email is required" })}
            />
          </div>
          <div className="mb-2 w-75">
            <label htmlFor="State" className="form-label">
              Phone number
            </label>
            <input
              type="tel"
              className="form-control shadow-none "
              id="State"
              style={{ border: "1px solid #C0C0C0" }}
              aria-describedby="emailHelp"
              {...register("Phone_number", {
                required: "Phone-number is required",
              })}
            />
          </div>

          <div className="mb-3 w-75">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control shadow-none "
              id="address"
              style={{ border: "1px solid #C0C0C0" }}
              aria-describedby="emailHelp"
              {...register(" Address", { required: " Address is required" })}
            />
          </div>
          <div className="mb-3 d-flex gap-3 w-100">
            <div>
              <label htmlFor="City" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control shadow-none "
                id="City"
                style={{ border: "1px solid #C0C0C0" }}
                aria-describedby="emailHelp"
                {...register("City", { required: "City is required" })}
              />
            </div>
            <div>
              <label htmlFor="State" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control shadow-none "
                id="State"
                style={{ border: "1px solid #C0C0C0" }}
                aria-describedby="emailHelp"
                {...register("State", { required: "State is required" })}
              />
            </div>
            <div>
              <label htmlFor=" Postal_code" className="form-label">
                Postal code
              </label>
              <input
                type="text"
                className="form-control shadow-none "
                id=" Postal_code"
                style={{ border: "1px solid #C0C0C0" }}
                aria-describedby="emailHelp"
                {...register("Postal_Code", {
                  required: "Postal-Code is required",
                })}
              />
            </div>
          </div>
        </div>
        <div className=" mt-4 d-flex justify-content-end gap-3">
          <button
            type="submit"
            className="p-1  px-3 fs-6 fw-normal cursor rounded-3"
            id="all-btn"
          >
            Add Address
          </button>
        </div>
      </form>
      <div className="container mt-2">
        <div className="row p-2">
          <h5 className="col=12 ">Addresses</h5>
          <h6 className="col-12 fs-6" style={{ color: "gray" }}>
            Chose from existing address
          </h6>
          <div
            className=" col-12  p-2 w-100 d-flex justify-content-center align-items-center flex-column mb-3 "
            style={{ border: "1px solid #C0C0C0", borderRadius: "10px" }}
          >
            {user.address[null]
              ? "No Existing Addresses Found Please Add a Address!"
              : user.address?.map((data, index) => (
                  <div
                    className="form-check row px-1 pt-0 mt-0 w-100  mb-2 d-flex flex-wrap align-items-center"
                    key={index}
                    style={{
                      border: "1px solid #C0C0C0",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="px-3 col-1">
                      <input
                        className="form-check-input m-0 mt-2"
                        type="radio"
                        name="flexRadioDefault"
                        onClick={(e) => handelAddress(e)}
                        value={index}
                        style={{ border: "1px solid black" }}
                      />
                    </div>
                    <div className=" col-11  my-2  d-sm-flex justify-content-center align-items-center">
                      <div className=" mt-3">
                        <div style={{ fontSize: "16px", fontWeight: "500" }}>
                          {data.Name}
                        </div>
                        <div className="fs-6 mb-1" style={{ color: "gray" }}>
                          <div>City: {data.City}</div>
                          <div>Email: {data.Email}</div>
                        </div>
                      </div>
                      <div className="ms-auto px-sm-3 text-md-end ">
                        Phone: {data.Phone_number}
                        <div className="text-md-end">{data.State}</div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <h5 className="col-12 ">Payment Method</h5>
          <h6 className="col fs-6 " style={{ color: "gray" }}>
            chose one
          </h6>
          <div className="col-12 mt-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="RadioPay"
                id="Cash"
                style={{ border: "1px solid black" }}
                onClick={handelPaymentMethod}
                checked={PaymentMethod === "Cash"}
                value="Cash"
              />
              <label className="form-check-label" htmlFor="Cash">
                Cash
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="RadioPay"
                id="Card"
                onClick={handelPaymentMethod}
                style={{ border: "1px solid black" }}
                value="Card"
                checked={PaymentMethod === "Card"}
              />
              <label className="form-check-label" htmlFor="Card">
                Card
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCheckOut;

FormCheckOut.propTypes = {
  handelAddress: PropTypes.func,
  handelPaymentMethod: PropTypes.func,
  PaymentMethod: PropTypes.string,
};
