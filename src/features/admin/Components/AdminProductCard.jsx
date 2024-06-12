import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";


const AdminProductCard = ({ products }) => {
  return (
    <div className="row py-2 ">
      <div className=" col-12 px-4 py-2 d-flex justify-content-center">
        <Link to="/admin/productForm">
          <button className="px-2 py-0 mb-2 " id="Admin-Button">
            Add new product
          </button>
        </Link>
      </div>
      <div className="col-12 m-0 px-sm-3 p-0 d-flex flex-wrap justify-content-between gap-sm-3 mt-sm-0  gap-3">
        <div className="row">
        {products.map((data) => (
          <Link
            to={`/admin/productDetails/${data.id}`}
            key={data.id}
            style={{ textDecoration: "none" }}
            className="col-lg-4 col-md-4 col-6  text-decoration-none text-black"
          >
            <div
              className="card m-sm-0 mt-2  rounded-3  overflow-hidden "
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="">
                <img
                  src={data.thumbnail}
                  className="card-img-top rounded-2  w-100"
                  style={{
                    height: "180px",

                    boxShadow:
                      " rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                    borderRadius: "5px  5px 0px 0px",
                  }}
                />
              </div>
              <div className="card-body m-0 py-1 px-sm-3 px-2">
                <h5 className="card-title">
                  {data.title?.slice(0, 15)}
                  {data.title?.length > 15 ? "..." : ""}
                </h5>
                <div className="card-text d-flex mb-2">
                  <div className=" d-flex w-100 justify-content-between">
                    <div className="">
                      <div
                        className=" w-100"
                        style={{ fontWeight: "500", fontSize: "18px" }}
                      >
                        {data.brand.slice(0, 12)}
                        {data.brand.length > 12 ? "..." : ""}
                      </div>
                      {data.deleted && (
                        <div className=" text-secondary text-danger">
                          Product Deleted
                        </div>
                      )}
                      {data.stock == 0 && (
                        <div className=" text-secondary text-danger">
                          Out of stock
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div
                        className=" text-secondary"
                        style={{ textDecoration: "line-through" }}
                      >
                        $ {data.price}
                      </div>
                      <div
                        className=""
                        style={{ fontSize: "20px", fontWeight: "500" }}
                      >
                        ${data.discountPrice}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2" style={{ borderTop: "1px solid #cccc" }}>
                  <Link
                    to={`/admin/productForm/edit/${data.id}`}
                    id="Admin-Button"
                    className="px-2 py-0"
                  >
                    Edit Product
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;

AdminProductCard.propTypes = {
  products: PropTypes.array,
};
