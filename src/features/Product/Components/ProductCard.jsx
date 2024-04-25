import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { discountPrice } from "../../../app/constant";

const ProductCard = ({ products }) => {
  return (
    <div className="row py-3">
      <div className="col-12 m-0 px-sm-3 p-2 d-flex flex-wrap justify-content-between gap-sm-3 mt-sm-0  gap-3">
        {products.map((data) => (
          <Link
            to={`/productDetails/${data.id}`}
            key={data.id}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card m-sm-0 mt-2  rounded-3 border-1 overflow-hidden "
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="">
                <img
                  src={data.thumbnail}
                  className="card-img-top   w-100"
                  style={{
                    height: "180px",
                    // boxShadow:
                    //   "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                    boxShadow:
                      " rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                    borderRadius: "5px  5px 0px 0px",
                  }}
                />
              </div>
              <div className="card-body m-0 py-1 px-sm-3 px-2">
                <h5 className="card-title">
                  {data.title.slice(0, 15)}
                  {data.title.length > 15 ? "..." : ""}
                </h5>
                <div className="card-text d-flex mb-2">
                  <div className=" d-flex w-100 justify-content-between">
                    <div className="">
                      <div>
                        <i
                          className="fa-solid fa-star "
                          style={{ color: "#0066b2" }}
                        ></i>
                        <span className="mx-1 text-end">{data.rating}</span>
                      </div>
                      <div
                        className=" w-100"
                        style={{ fontWeight: "500", fontSize: "18px" }}
                      >
                        {data.brand.slice(0, 12)}
                        {data.brand.length > 12 ? "..." : ""}
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className=""
                        style={{ fontSize: "20px", fontWeight: "500" }}
                      >
                        $
                        {discountPrice(data)}
                      </div>
                      <div
                        className=" text-secondary"
                        style={{ textDecoration: "line-through" }}
                      >
                        $ {data.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  products: PropTypes.array,
};
