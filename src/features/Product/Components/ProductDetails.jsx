import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import {
  selectProductById,
  selectProductListStatus,
  fetchProductByIdAsync,

} from "../productSlice.js";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { AddItemsAsync, SelectCartItems } from "../../cart/cartSlice";
import { AddItemsAsync, selectCartItems } from "../../cart/cartSlice.js";
import { selectLoggedUser } from "../../auth/authSlice.js";
import Loading from "../../../Pages/loading";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';


const ProductDetails = () => {
  // const reviews = { href: "#", average: 4, totalCount: 117 };
  const [addToCart, setAddToCart] = useState("Add to cart");
  const [color, setColor] = useState(null)
  const items = useSelector(selectCartItems);
  const ProductById = useSelector(selectProductById);
  const user = useSelector(selectLoggedUser);
  const status = useSelector(selectProductListStatus);
  const dispatch = useDispatch();
  const Params = useParams();
  const Success = (name) =>
    toast.success(`${name} added to cart`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const handelCart = (e) => {

    if (color == null) {
      return toast.warn(`Please Select Color`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    e.preventDefault();
    setAddToCart("Added!");

    if (items.findIndex((item) => item.product.id === ProductById.id) < 0) {

      const newItem = { product: ProductById.id, quantity: 1, color: color };
      delete newItem["id"];
      dispatch(AddItemsAsync(newItem));
      Success(ProductById.title);
    } else {
      return toast.warn("Already added in cart", {
        position: "top-center",
        autoClose: 3003,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  useEffect(() => {
    dispatch(fetchProductByIdAsync(Params.id));

  }, [Params.id]);

  const feature = [
    "100% Original Products",
    "Pay on delivery might be available",
    "Easy 14 days returns and exchanges",
    "Online Support",
    "Flexible Payment",
    "Free Shipping"
  ]

  return (
    <>
      {status == "loading" || !ProductById ? (
        <Loading />
      ) : (
        <div className=" container-lg container-fluid px-lg-3 mb-2">
          <div className="row px-3 mt-3 ">
            <div className="col-7  flex-wrap d-md-flex d-none" style={{ height: "500px" }}>
              <div className="row "  >
                {ProductById.images.map((image, index) => (
                  <div className="col-6 p-1 mt-2" key={index} >
                    <img src={image} alt="" className="h-100 w-100 " style={{ border: "1px solid 	#D3D3D3", borderRadius: "7px" }} />
                  </div>
                ))
                }
              </div>
            </div>
            <div className="col-12 d-md-none d-block m-0 p-0" style={{ height: "300px" }}>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}

                modules={[Autoplay, Pagination]}
                className="mySwiper w-100 h-100 p-0"
              >
                {ProductById.images.map((image, index) => (
                  <SwiperSlide key={{ index }}>
                    <img src={image} alt="" className="h-100 w-100 " style={{ border: "1px solid 	#D3D3D3", borderRadius: "7px" }} />
                  </SwiperSlide>
                ))
                }

              </Swiper>

            </div>
            <div className="col-md-5 mt-2 px-md-4 p-0">
              <div className="row mx-2">
                <div className="col-12 p-0 ProductNameFont" >
                  {ProductById.title}
                </div>
              </div>
              <div className="row  mx-2 mt-3" >
                <div className="col-12 p-0 pb-2" style={{ color: "#777985", fontSize: "20px", borderBottom: "1px solid #777985" }} >
                  {ProductById.description}
                </div>
              </div>
              <div className="row  mx-2 mt-4" >
                <div className="col-3 p-0 pb-2  " style={{ fontSize: "25px", fontWeight: "700" }} >
                  ${ProductById.discountPrice}
                </div>
                <div className="col-3 p-0 pb-2 text-decoration-line-through" style={{ fontSize: "25px", color: "#777985", }} >
                  ${ProductById.price}
                </div>

              </div>
              <div className="row  mx-2 mt-2" >
                <div className="col-12 p-0 pb-2  text-success " style={{ fontSize: "15px", fontWeight: "700" }} >
                  inclusive of all taxes
                </div>
              </div>
              <div className="row  mx-2 mt-2" >
                <div className="col-12 p-0 pb-2 " style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px" }} >
                  COLORS
                </div>
                <select className="col-7 p-2" style={{ backgroundColor: "#F5F5F6", borderRadius: "5px", fontSize: "15px" }} onChange={(e) => setColor(e.target.value)}>
                  <option value="">--Chose color--</option>
                  {ProductById.color.map((options, index) => (
                    <option key={{ index }} style={{ borderRadius: "5px" }} >{options}</option>
                  ))
                  }
                </select>

              </div>
              <div className="row  mx-2 mt-3" style={{ borderBottom: "1px solid #777985" }}>
                {!user ? (
                  <Link to="/login" className=" col-12  text-decoration-none">
                    <div
                      className="mt-5 p-2 rounded-3 text-center cursor"
                     
                    >
                      Please Login to Buy the Product
                    </div>
                  </Link>
                ) : ProductById.stock == 0 ? (
                  <div
                    className="col-12  text-secondary text-danger text-center mt-4"
                    style={{ fontSize: "25px" }}
                  >
                    Out of stock
                  </div>
                ) : (
                  <div
                    onClick={handelCart}
                    className="all-btn col-12 p-1 mb-4 cursor text-center mt-4"

                  >
                    {addToCart}
                  </div>)}
              </div>
              <div className="row  mx-2 mt-3 pt-3" >
                <div className="col-12 p-0 " style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px" }} >
                  HIGHLIGHT
                </div>
                <ul className="col-12 p-0" >
                  {ProductById.highlights.map((data, index) => (
                    <div className=" mt-2 d-flex text-start" key={index}>

                      <i className="bi bi-dot p-0" style={{ fontSize: "20px" }}></i>

                      <div className="">{capitalizeFirstLetter(data)}</div>
                    </div>
                  ))
                  }
                </ul>
              </div>
              <div className="row  mx-2  pt-3 mb-3" >
                <div className="col-12 p-0 " style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "1px" }} >
                  ADVANTAGES
                </div>
                <div className="col-12 p-0" >
                  {feature.map((data, index) => (
                    <div className=" mt-2 d-flex text-start" key={index}>
                      <i className="bi bi-dot p-0" style={{ fontSize: "20px" }}></i>
                      {capitalizeFirstLetter(data)}
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;


