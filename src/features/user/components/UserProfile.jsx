import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  selectUserInfoStatus,
  updateUserAsync,
} from "../userSlice.jsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import ConformDelete from "../../../Pages/ConformDelete";
import Loading from "../../../Pages/loading";

const UserProfile = () => {
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectUserInfoStatus);
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(-1);
  const [showAddAddress, setAddAddress] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const handelRemove = (e, index) => {
    const newUser = { ...userInfo, address: [...userInfo.address] };
    newUser.address.splice(index, 1);
    dispatch(updateUserAsync(newUser));

    toast.success("Address Deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handelEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, address: [...userInfo.address] };
    newUser.address.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setEditAddress(-1);
  };

  const handelEditForm = (index) => {
    setEditAddress(index);
    setAddAddress(false);
    setValue("Name", userInfo.address[index].Name);
    setValue("Email", userInfo.address[index].Email);
    setValue("Phone_number", userInfo.address[index].Phone_number);
    setValue("Postal_Code", userInfo.address[index].Postal_Code);
    setValue("Address", userInfo.address[index].Address);
    setValue("City", userInfo.address[index].City);
    setValue("State", userInfo.address[index].State);
  };

  const handelAdd = (address) => {
    const newUser = { ...userInfo, address: [...userInfo.address, address] };
    dispatch(updateUserAsync(newUser));
    setAddAddress(false);
    setEditAddress(-1);
    setValue(null);
  };

  return (
    <>
      {userInfo == null ? (
        <Loading />
      ) : (
        <div className=" container-lg container-fluid mb-5">
          <div className="row d-flex justify-content-center align-items-center mt-4">
            <h5
              className="col-md-9 col-12"
              style={{ fontSize: "25px", fontWeight: "6000" }}
            >
              Profile
            </h5>
          </div>
          <div className="row mt-1 p-md-3 d-flex justify-content-center align-items-center">
            <div className="col-md-9 col-12 p-2 box">
              <div
                className="d-flex "
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                <div className="">Email ID :</div>
                <div className="px-2">{userInfo.email}</div>
              </div>
              {userInfo.role == "admin" && (
                <div
                  className="d-flex "
                  style={{ fontSize: "18px", fontWeight: "600" }}
                >
                  <div className="">Role:</div>
                  <div className="px-2">{userInfo.role}</div>
                </div>
              )}
              <div
                className=" py-1 mt-2 text-sm-end  ms-auto fs-6 fw-normal cursor rounded-3"
                style={{
                  color: "#0066b2",
                  width: "190px",
                  border: "1px solid #0066b2",
                }}
                onClick={() => {
                  setEditAddress(-1);
                  setAddAddress(true);
                }}
              >
                <div className="mx-auto text-center">Add New Address </div>
              </div>

              <div className="mt-2 px-2">
                {showAddAddress ? (
                  <div className="p-1 mt-2">
                    <h5
                      className="py-1"
                      style={{ borderBottom: "1px solid #cccc" }}
                    >
                      New Address
                    </h5>
                    <form
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        handelAdd(data);
                        reset();
                      })}
                      className="mt-3 mb-3 box p-3"
                    >
                      <div>
                        <div className="mb-3 d-flex gap-4">
                          <div className="w-100">
                            <label htmlFor="firstName" className="form-label">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control shadow-none"
                              id="firstName"
                              style={{ border: "1px solid #C0C0C0" }}
                              aria-describedby="emailHelp"
                              {...register("Name", {
                                required: "Full Name is required",
                              })}
                            />
                          </div>
                        </div>
                        <div className="mb-3 w-100">
                          <label htmlFor="email" className="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control shadow-none "
                            id="email"
                            style={{ border: "1px solid #C0C0C0" }}
                            aria-describedby="emailHelp"
                            {...register("Email", {
                              required: "Email is required",
                            })}
                          />
                        </div>
                        <div className="mb-2 w-100">
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

                        <div className="mb-3 ">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control shadow-none "
                            id="address"
                            style={{ border: "1px solid #C0C0C0" }}
                            aria-describedby="emailHelp"
                            {...register("Address", {
                              required: " Address is required",
                            })}
                          />
                        </div>
                        <div className="mb-3 d-flex gap-3">
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
                              {...register("City", {
                                required: "City is required",
                              })}
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
                              {...register("State", {
                                required: "State is required",
                              })}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor=" Postal_code"
                              className="form-label"
                            >
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
                        <div
                          className="p-1  px-3 fs-6 fw-normal cursor rounded-3"
                          style={{ color: "#0066b2" }}
                          onClick={() => setAddAddress(false)}
                        >
                          Cancel
                        </div>
                        <button
                          type="submit"
                          className="p-1 all-btn px-3 fs-6 fw-normal cursor "
                        >
                          Add Address
                        </button>
                      </div>
                    </form>
                  </div>
                ) : null}
                <h5
                  className="mt-2 py-2"
                  style={{ borderTop: "1px solid #cccc" }}
                >
                  Existing address:
                </h5>
                {!userInfo.address[0] ? (
                  <div className="text-center">No Address Found</div>
                ) : (
                  userInfo.address?.map((data, index) => (
                    <div key={index} className="px-1">
                      {editAddress == index ? (
                        <div className="p-1 mt-2">
                          <h5>Edit Address</h5>
                          <form
                            noValidate
                            onSubmit={handleSubmit((data) => {
            
                              handelEdit(data, index);
                              reset();
                            })}
                            className="p-3 box"
                          >
                            <div>
                              <div className="mb-3 d-flex gap-4">
                                <div className="w-100">
                                  <label
                                    htmlFor="firstName"
                                    className="form-label"
                                  >
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control shadow-none"
                                    id="firstName"
                                    style={{ border: "1px solid #C0C0C0" }}
                                    aria-describedby="emailHelp"
                                    {...register("Name", {
                                      required: "Full Name is required",
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 w-100">
                                <label htmlFor="email" className="form-label">
                                  Email address
                                </label>
                                <input
                                  type="email"
                                  className="form-control shadow-none "
                                  id="email"
                                  style={{ border: "1px solid #C0C0C0" }}
                                  aria-describedby="emailHelp"
                                  {...register("Email", {
                                    required: "Email is required",
                                  })}
                                />
                              </div>
                              <div className="mb-2 w-100">
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

                              <div className="mb-3 ">
                                <label htmlFor="address" className="form-label">
                                  Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control shadow-none "
                                  id="address"
                                  style={{ border: "1px solid #C0C0C0" }}
                                  aria-describedby="emailHelp"
                                  {...register("Address", {
                                    required: " Address is required",
                                  })}
                                />
                              </div>
                              <div className="mb-3 d-flex gap-3">
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
                                    {...register("City", {
                                      required: "City is required",
                                    })}
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
                                    {...register("State", {
                                      required: "State is required",
                                    })}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor=" Postal_code"
                                    className="form-label"
                                  >
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
                              <div
                                className="p-1  px-3 fs-6 fw-normal cursor rounded-3"
                                style={{ color: "#0066b2" }}
                                onClick={() => setEditAddress(-1)}
                              >
                                Cancel
                              </div>
                              <button
                                type="submit"
                                className="p-1 all-btn px-3 fs-6 fw-normal cursor "
                                
                              >
                                Edit Address
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : null}
                      {status == "loading" ? (
                        <Loading />
                      ) : (
                        <div
                          className="p-2 mt-3 box"
                          style={{ backgroundColor: "#F5F5F5" }}
                        >
                          <>
                            <div className=" w-100 px-2 d-sm-flex justify-content-center align-items-center">
                              <div className="">
                                <div
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                  }}
                                ></div>
                                <div className="fs-6 mb-1">
                                  <div>Name: {data.Name}</div>
                                  <div>City: {data.City}</div>
                                  Phone: {data.Phone_number}
                                </div>
                              </div>
                              <div className="ms-auto  text-md-end ">
                                <div className="text-md-end">
                                  State: {data.State}
                                </div>
                                <div className="text-md-end">
                                  Postal-code: {data.Postal_Code}
                                </div>
                                <div className="text-md-end">
                                  Address: {data.Address}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 py-2 d-flex gap-2" style={{borderTop:"1px solid #D6D6D6"}}>
                              <div
                                className="text-center all-btn px-3 cursor"
                                onClick={() => {
                                  handelEditForm(index);
                                }}
                              >
                                Edit
                              </div>
                              <div
                                data-bs-toggle="modal"
                                data-bs-target={`#staticBackdrop${index}`}
                                className="text-center all-btn px-3 ms-auto cursor"
                              >
                                Remove
                              </div>

                              <div
                                className="modal fade"
                                id={`staticBackdrop${index}`}
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex="-1"
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <ConformDelete
                                    handelRemove={handelRemove}
                                    index={index}
                                    data={data}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
