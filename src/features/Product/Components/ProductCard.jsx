import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { discountPrice } from "../../../app/constant";

const ProductCard = ({ products }) => {
  return (
    <div className="row py-1">
      <div className="col-12 m-0 px-sm-3 p-2 d-flex flex-wrap justify-content-between gap-sm-3 mt-sm-0  gap-3">
        {products.map((data) => (
          <Link
            to={`/productDetails/${data.id}`}
            key={data.id}
            style={{ textDecoration: "none" }}
          >
            <div
              className="card m-sm-0 mt-3 border-1 overflow-hidden rounded-0"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div className="image rounded-2">
                <img
                  src={data.thumbnail}
                  className="img card-img-top rounded-2"
                />
                {
                 
                    data.images[1] &&
                    <img
                      src={data.images[1]}
                      className="img-2 card-img-top"
                    />
                 
                }
              </div>
              <div className="text-center   d-flex justify-content-between">
                <div
                  className="card-title mt-1 p-0"
                  style={{ fontSize: "17px", fontWeight: "600" }}
                >
                  {data.title?.slice(0, 19)}
                  {data.title?.length > 19 ? "..." : ""}
                </div>
                <div
                  className="mt-1"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  ${discountPrice(data)}
                </div>
              </div>

              <div className="card-body m-0 p-0 mb-3">
                <div className="card-text">
                  <div className="  w-100 d-flex justify-content-between">
                    <div
                      className=""
                      style={{
                        fontWeight: "500",
                        fontSize: "15px",
                        color: "#808080",
                      }}
                    >
                      {data.brand.slice(0, 15)}
                      {data.brand.length > 15 ? "..." : ""}
                    </div>
                    <div
                      className=" text-secondary "
                      style={{ textDecoration: "line-through" }}
                    >
                      $ {data.price}
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
