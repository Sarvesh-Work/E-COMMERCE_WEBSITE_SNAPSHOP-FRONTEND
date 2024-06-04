import { useDispatch, useSelector } from "react-redux";
import {
  selectProductById,
  selectProductListStatus,
  fetchProductByIdAsync,
} from "../../Product/productSlice";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddItemsAsync } from "../../cart/cartSlice";
import { discountPrice } from "../../../app/constant";
import Loading from "../../../Pages/loading";
import { selectLoggedUser } from "../../auth/authSlice";

const AdminProductDetails = () => {
  // const reviews = { href: "#", average: 4, totalCount: 117 };
  const [addToCart, setAddToCart] = useState("Add to cart");
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const ProductById = useSelector(selectProductById);
  const user = useSelector(selectLoggedUser);
  const status = useSelector(selectProductListStatus);
  const dispatch = useDispatch();
  const Params = useParams();
  const handelCart = (e) => {
    e.preventDefault();
    setAddToCart("Added!");
    const newItem = { ...ProductById, quantity: 1 };
    delete newItem["id"];
    dispatch(AddItemsAsync(newItem));
  };
  useEffect(() => {
    dispatch(fetchProductByIdAsync(Params.id));
  }, [Params.id]);

  return (
    // <>
    //   {ProductById ? (
    //     <div className=" container-lg container-fluid px-lg-3 mb-2">
    //       <div className="row px-5 px-lg-1 mt-4 d-flex justify-content-between">
    //         <div className="col-lg-4 h-100   col-5 p-0 box overflow-hidden d-md-inline d-none">
    //           <img
    //             src={ProductById.images[0]}
    //             alt=""
    //             className="h-100 w-100 overflow-hidden "
    //           />
    //         </div>
    //         <div className="col-3 p-0 d-lg-inline d-none ">
    //           <div
    //             className="  box overflow-hidden"
    //             style={{ height: "235px" }}
    //           >
    //             <img
    //               src={ProductById.images[1]}
    //               alt=""
    //               className="h-100 w-100 "
    //             />
    //           </div>
    //           <div
    //             className=" mt-3 box overflow-hidden"
    //             style={{ height: "235px" }}
    //           >
    //             <img
    //               src={ProductById.images[2]}
    //               alt=""
    //               className="h-100 w-100"
    //             />
    //           </div>
    //         </div>

    //         <div className="col-lg-4 h-100 col-md-5 col-12 p-0 box overflow-hidden">
    //           <img src={ProductById.images[3]} alt="" className="h-100 w-100" />
    //         </div>
    //       </div>

    //       <div className="row p-lg-1 px-4 mt-2 mt-4 d-flex justify-content-between">
    //         <div className="col-md-7 p-0 col-12">
    //           <h1>{ProductById.title}</h1>
    //           <div
    //             className=" text-secondary d-md-none d-block"
    //             style={{ textDecoration: "line-through" }}
    //           >
    //             $ {ProductById.price}
    //           </div>
    //           <h2 className="d-md-none d-block mt-3">
    //             ${discountPrice(ProductById)}
    //           </h2>

    //           <div className=" d-md-none d-block">
    //             {[0, 1, 2, 3, 4].map((rating) => (
    //               <i
    //                 key={rating}
    //                 className={classNames(
    //                   reviews.average > rating
    //                     ? "fa-solid fa-star text-dark"
    //                     : "fa-solid fa-star text-secondary"
    //                 )}
    //                 aria-hidden="true"
    //               ></i>
    //             ))}
    //           </div>

    //           <p className="mt-4" style={{ fontSize: "17px" }}>
    //             {ProductById.description}
    //           </p>

    //           <h1 className="mt-5">Highlights</h1>
    //           <ul className=" text-secondary mt-2">
    //             <li>Hand cut and sewn locally</li>
    //             <li>Dyed with our proprietary colors</li>
    //             <li>Pre-washed & pre-shrunk</li>
    //             <li>Ultra-soft 100% cotton</li>
    //           </ul>

    //           <h1 className="mt-5">Details</h1>
    //           <p className=" text-secondary mt-2">
    //             The 6-Pack includes two black, two white, and two heather gray
    //             Basic Tees. Sign up for our subscription service and be the
    //             first to get new, exciting colors, like our upcoming limited
    //             release.
    //           </p>
    //         </div>

    //         <div
    //           className=" d-md-inline d-none"
    //           style={{ borderRight: "1px solid #B6B6B4", width: "1px" }}
    //         ></div>

    //         <div className="col-md-4 col-12 px-md-2 p-0 ">
    //           <div
    //             className=" text-secondary "
    //             style={{ textDecoration: "line-through" }}
    //           >
    //             $ {ProductById.price}
    //           </div>
    //           <h2 className=" mt-3">${discountPrice(ProductById)}</h2>

    //           <div className=" d-md-block d-none">
    //             {[0, 1, 2, 3, 4].map((rating) => (
    //               <i
    //                 key={rating}
    //                 className={classNames(
    //                   Math.round(ProductById.rating) > rating
    //                     ? "fa-solid fa-star text-dark"
    //                     : "fa-solid fa-star text-secondary"
    //                 )}
    //                 aria-hidden="true"
    //               ></i>
    //             ))}
    //           </div>

    //           <div
    //             onClick={handelCart}
    //             className="mt-5 p-2 rounded-3 text-center cursor"
    //             id="all-btn"
    //           >
    //             {addToCart}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : null}
    // </>

    <>
      {status == "loading" || !ProductById ? (
        <Loading />
      ) : (
        <div className=" container-lg container-fluid px-lg-3 mb-2">
          <div className="row px-5 px-lg-1 mt-4 d-flex justify-content-between">
            <div className="col-lg-4 h-100   col-5 p-0 box overflow-hidden d-md-inline d-none">
              <img
                src={ProductById.images[0]}
                alt=""
                className="h-100 w-100 overflow-hidden "
              />
            </div>
            <div className="col-3 p-0 d-lg-inline d-none ">
              <div
                className="  box overflow-hidden"
                style={{ height: "235px" }}
              >
                <img
                  src={ProductById.images[1]}
                  alt=""
                  className="h-100 w-100 "
                />
              </div>
              <div
                className=" mt-3 box overflow-hidden"
                style={{ height: "235px" }}
              >
                <img
                  src={ProductById.images[2]}
                  alt=""
                  className="h-100 w-100"
                />
              </div>
            </div>

            <div className="col-lg-4 h-100 col-md-5 col-12 p-0 box overflow-hidden">
              <img src={ProductById.images[3]} alt="" className="h-100 w-100" />
            </div>
          </div>

          <div className="row p-lg-1 px-4 mt-2 mt-4 d-flex justify-content-between">
            <div className="col-md-7 p-0 col-12">
              <h1>{ProductById.title}</h1>

              {ProductById.stock == 0 ? null : (
                <>
                  <h2 className="d-md-block d-none text-decoration-line-through">
                    ${ProductById.price}
                  </h2>
                  <h2 className="d-md-block d-none mt-3">
                    ${discountPrice(ProductById)}
                  </h2>
                </>
              )}

              <div className=" d-md-none d-block">
                {ProductById.stock == 0 ? null : (
                  <div>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <i
                        key={rating}
                        className={classNames(
                          Math.round(ProductById.rating) > rating
                            ? "fa-solid fa-star text-dark"
                            : "fa-solid fa-star text-secondary"
                        )}
                        aria-hidden="true"
                      ></i>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-4" style={{ fontSize: "17px" }}>
                {ProductById.description}
              </p>

              <h1 className="mt-5">Highlights</h1>
              <ul className=" text-secondary mt-2">
                <li>Hand cut and sewn locally</li>
                <li>Dyed with our proprietary colors</li>
                <li>Pre-washed & pre-shrunk</li>
                <li>Ultra-soft 100% cotton</li>
              </ul>

              <h1 className="mt-5">Details</h1>
              <p className=" text-secondary mt-2">
                The 6-Pack includes two black, two white, and two heather gray
                Basic Tees. Sign up for our subscription service and be the
                first to get new, exciting colors, like our upcoming limited
                release.
              </p>
            </div>

            <div
              className=" d-md-inline d-none"
              style={{ borderRight: "1px solid #B6B6B4", width: "1px" }}
            ></div>

            <div className="col-md-4 col-12 px-md-2 p-0 ">
              {ProductById.stock == 0 ? null : (
                <>
                  <h2 className="d-md-block d-none text-decoration-line-through">
                    ${ProductById.price}
                  </h2>
                  <h2 className="d-md-block d-none mt-3">
                    ${discountPrice(ProductById)}
                  </h2>
                </>
              )}

              <div className=" d-md-block d-none">
                {ProductById.stock == 0 ? null : (
                  <div>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <i
                        key={rating}
                        className={classNames(
                          Math.round(ProductById.rating) > rating
                            ? "fa-solid fa-star text-dark"
                            : "fa-solid fa-star text-secondary"
                        )}
                        aria-hidden="true"
                      ></i>
                    ))}
                  </div>
                )}
              </div>

              {!user ? (
                <Link to="/login" className=" text-decoration-none">
                  <div
                    className="mt-5 p-2 rounded-3 text-center cursor"
                    id="all-btn"
                  >
                    Please Login to Buy the Product
                  </div>
                </Link>
              ) : ProductById.stock == 0 ? (
                <div
                  className="text-secondary text-danger text-center mt-4"
                  style={{ fontSize: "35px" }}
                >
                  Out of stock
                </div>
              ) : (
                <div
                  onClick={handelCart}
                  className="mt-5 p-2 rounded-3 text-center cursor"
                  id="all-btn"
                >
                  {addToCart}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductDetails;
