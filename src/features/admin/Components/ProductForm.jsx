export default function ProductForm() {
  return (
    <>
      <div className="container-lg container-fluid px-3 mb-2 mt-3 ">
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <h4 className="col-lg-8 col-12">Add Product</h4>
        </div>
        <div className="row d-flex flex-column justify-content-center align-items-center">
          <div className="col-lg-8 col-12">
            <form noValidate className="mt-2">
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
          </div>
        </div>
      </div>
    </>
  );
}
