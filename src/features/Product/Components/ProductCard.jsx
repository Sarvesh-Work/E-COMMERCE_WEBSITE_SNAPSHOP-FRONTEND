import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";


const ProductCard = ({ products }) => {
  return (
    <>
      {products &&
        <div className="row py-1">
          <div className="col-12 m-0 px-sm-3 p-2 ">
            <div className="row p-0">
              {products.map((data) => (
                <Link
                  to={`/productDetails/${data.id}`}
                  key={data.id}
                  style={{ textDecoration: "none" }}
                  className="col-lg-3 col-md-4 col-6  text-decoration-none text-black"
                >
                  <div
                    className=" m-sm-0 mt-3"
                    style={{ backgroundColor: "#FFFFFF", }}
                  >
                    <div className="image rounded-2" style={{border: "1px solid 	#D3D3D3" }}>
                      <img
                        src={data.thumbnail}
                        className="img card-img-top rounded-2"
                      
                      />
                      {

                        data.images[2] &&
                        <img
                          src={data.images[2]}
                          className="img-2 card-img-top border-1"
                          
                        />

                      }
                    </div>
                    <div className="  d-flex justify-content-between">
                      <div
                        className="card-title mt-1 p-0 f-md-3 f-6 fw-bold"

                      >
                        {data.title?.slice(0, 15)}
                        {data.title?.length > 15 ? "..." : ""}
                      </div>
                      <div
                        className="mt-1 f-md-3 f-5 fw-bold"

                      >
                        ${data.discountPrice}
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
        </div>}
    </>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  products: PropTypes.array,
};
